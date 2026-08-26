import os
import os.path as path
import shutil
import argparse
import ast

dicionario_default :dict = {
    'versao' : '',
    'diretorio_raiz': '',
    'diretorio_raiz_conteudo': 'src',
    'diretorio_saida' : 'build',
    'caminho_manifest' : '',
    'pasta_final' : 'Atalhos',
    'pasta_final_conteudo' : r'Atalhos\src',
    'pastas_copiar' : ['force-darkmode', 'icons', 'images', 'css','html',],
    'pastas_final' : ['src/'],
    'arquivos' : ['src/js/utils.js',
                  'src/js/listas_model.js',
                  'src/js/script.js',
                  'src/js/config_model.js'
                  ]
    ,'arquivos_renomear' : {
        'src/js/config_model.js': 'src/js/config.js'
        ,'src/js/listas_model.js': 'src/js/listas.js'
        }
}

def clear () -> None:
    """
    Limpa o console do terminal de acordo com o sistema operacional.
    """
    os.system('cls' if os.name == 'nt' else 'clear')

def create_dir(dir_path:str) -> None:
    """
    Cria um diretório se ele ainda não existir.

    Args:
        dir_path (str): Caminho do diretório a ser criado.
    """
    if not validar_caminho(dir_path):
        os.mkdir(dir_path)
            
def validar_caminho(path:str) -> bool:
    """
    Verifica se um caminho (arquivo ou diretório) existe no sistema.

    Args:
        path (str): Caminho a ser validado.

    Returns:
        bool: True se existir, False caso contrário.
    """
    return os.path.exists(path)

def generate_build(dict_release_config, verbose = False):
    """
    Executa o fluxo principal de geração do build da extensão.
    
    O processo inclui a criação de pastas, cópia de manifestos,
    recursos estáticos e scripts, além do empacotamento final em ZIP.
    """
    
    build_dir:str = path.join(dict_release_config['diretorio_saida'])
       
    if verbose:
        print(f'Creating output dir: {build_dir}')

    create_dir(build_dir)
    final_dir:str = path.join(build_dir, dict_release_config['pasta_final'])

    if verbose:
        print('Created.')
        print(f'Creating output dir folder: {final_dir}')
    
    recreate_dir(final_dir)
    final_content_dir:str = path.join(build_dir, dict_release_config['pasta_final_conteudo'])
    
    if verbose:
        print('Created.')
        print(f'Creating output content dir: {final_content_dir}')
    
    create_dir(final_content_dir)
    
    if not path.exists(final_dir):
        print('Caminho final nao existe.')
        return

    if verbose:
        print('Created.')

    if len(dict_release_config['caminho_manifest']) <= 0:
        if verbose:
            print(f'Coping manifest to "{final_dir}".')

        shutil.copy('manifest.json', final_dir)
        if verbose:
            print(f'Done.')
    
    if verbose:
        print(f'Coping folder.')

    content_root_path:str = path.join(dict_release_config['diretorio_raiz'] if len(dict_release_config['diretorio_raiz']) > 0 else os.getcwd(), dict_release_config['diretorio_raiz_conteudo'])

    if len(dict_release_config['pastas_copiar']) > 0:
        for i in dict_release_config['pastas_copiar']:
            copiar_pasta(path.join(content_root_path, i), path.join(final_content_dir, i))

        if verbose:
            print(f'Done.')

    if verbose:
        print(f'Coping files.')

    for file in dict_release_config['arquivos']:
        origin_path:str = path.join(dict_release_config['diretorio_raiz'] , file.replace('/', '\\'))
        final_path:str = path.join(final_dir, file.replace('/', '\\'))

        if path.isfile(origin_path):
            f = '\\'.join([ texto for texto in file.split('/') if not str(texto).endswith('.js')])
            
            if dict(dict_release_config['arquivos_renomear']).get(file):
                final_path:str = path.join(final_dir, dict(dict_release_config['arquivos_renomear']).get(file).replace('/', '\\'))
            
            if path.isdir(path.join(dict_release_config['diretorio_raiz'], f)):
                create_dir(path.join(final_dir, f))

            shutil.copy(origin_path, final_path)
    if verbose:
        print(f'Done.')
    
    versao:str = get_version(path.join(final_dir, 'manifest.json'))
    
    nem_file_name:str = final_dir + '-' + versao
    
    if verbose:
        print(f'Creating output dir-version: {nem_file_name}')

    recreate_dir(nem_file_name)

    if verbose:
        print('Done')

    copiar_pasta(final_dir, path.join(nem_file_name,dict_release_config['pasta_final']))
    
    if verbose:
        print(f'Files saved in: {nem_file_name}')

    zip_file(path.join(nem_file_name,dict_release_config['pasta_final']))

    if verbose:
        print(f'Files saved in: {path.join(nem_file_name,dict_release_config['pasta_final'])}.zip')

    
def recreate_dir(dir_name:str) -> None:
    """
    Remove um diretório se ele existir e o cria novamente.

    Args:
        dir_name (str): Nome do diretório a ser recriado.
    """
    remove_dir(dir_name)
    create_dir(dir_name)
    
def copiar_pasta(origem, destino):
    """
    Copia o conteúdo de uma pasta de origem para um destino, ignorando arquivos temporários.

    Args:
        origem (str): Caminho da pasta de origem.
        destino (str): Caminho da pasta de destino.
    """
    def ignore_files(dir, files):
        return [f for f in files if str(f).startswith('_')]

    if validar_caminho(destino):
        print(f'A pasta de destino já existe. | {destino}')
        return
    
    try:
        shutil.copytree(origem, destino, ignore=ignore_files)
    except FileExistsError:
        print(f'Erro: A pasta de destino já existe. | {destino}')
    except Exception as e:
        print(f"Ocorreu um erro: {e}")

def get_version(file_path:str) -> str:
    """
    Extrai a versão da extensão a partir do arquivo manifest.json.

    Args:
        file_path (str): Caminho para o arquivo manifest.json.

    Returns:
        str: String da versão encontrada.
    """
    version:str = ''

    if validar_caminho(file_path):
        
        with open(file_path, 'r') as manifest:
            for line in manifest:
                
                if '"version"' in line.strip():
                    version = line.strip()[11::].replace('"', '').replace(',', '') 

    return version

def zip_file(file_name:str) -> None:
    """
    Compacta um diretório em um arquivo ZIP e remove a pasta original.

    Args:
        file_name (str): Nome/Caminho do diretório a ser compactado.
    """
    shutil.make_archive(base_name= file_name, format= 'zip', root_dir= file_name)
    
    remove_dir(file_name)
    
def remove_dir(path:str) -> None:
    """
    Remove recursivamente um diretório e todo o seu conteúdo.

    Args:
        path (str): Caminho do diretório a ser removido.
    """
    if validar_caminho(path):
        try:
            shutil.rmtree(path)
        except OSError as e:
            print(f"Erro: {e.strerror}")            

def rename_file(file:str, new_file_name:str) -> None:
    """
    Renomeia um arquivo existente.

    Args:
        file (str): Caminho atual do arquivo.
        new_file_name (str): Novo nome/caminho para o arquivo.
    """
    if not validar_caminho(file):
        return

    if validar_caminho(new_file_name):
        remove_dir(new_file_name)
        
    os.rename(file, new_file_name)

def run() -> None:
    """
    Inicia a execução do script de build.
    """
    clear()
    
    parser = argparse.ArgumentParser(
            prog= 'Gerar release da estensão',
            description= 'Criado para gerar ou facilitar a liberação do versão autal da extensão',
            epilog=f'Se não especificado o caminho com as configurações será usado "dicionario_default" localizao em python/build')

    parser.add_argument('path', type=str, nargs='?', help='Caminho do arquivo com as configurações.', default='')
    parser.add_argument('-v', '--verbose', action='store_true', help="Exibe a exução das etapas sendo feitas.")

    args = parser.parse_args()
    
    print('Process start.')

    full_path = path.join(os.getcwd(), 'python', args.path)
        
    if args.verbose:
        print(f'Generating release to "{args.path if args.path != '' else 'default'}".')
    
    if args.path == '':
        generate_build(dicionario_default, args.verbose)
        
    else:
        
        if not path.isfile(full_path):
            raise ValueError('Caminho informado não é um arquivo válido.')

        with open (full_path, 'r', encoding='utf-8') as file:
            config_data = file.read()
            
        config = ast.literal_eval(config_data)
        
        generate_build(config, args.verbose)

    print('Process finished.')
    
        
if __name__ == '__main__':
    run()

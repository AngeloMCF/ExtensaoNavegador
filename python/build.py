import os
import os.path as path
import shutil

debug_mode: bool = False

dicionario:dict = {
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
def limpa_tela () -> None:
    os.system('cls' if os.name == 'nt' else 'clear')

def create_dir(dir_path:str) -> None:

    if not validar_caminho(dir_path):
        os.mkdir(dir_path)
   
            
def validar_caminho(path:str) -> bool:
    return os.path.exists(path)


def generate_build():
    
    build_dir:str = path.join(dicionario['diretorio_saida'])
    create_dir(build_dir)
    
    final_dir:str = path.join(dicionario['diretorio_saida'], dicionario['pasta_final'])
    
    recreate_dir(final_dir)
    
    final_content_dir:str = path.join(build_dir, dicionario['pasta_final_conteudo'])
    create_dir(final_content_dir)
    
    if not path.exists(final_dir):
        print('Caminho final nao existe.')
        return

    if len(dicionario['caminho_manifest']) <= 0 :
        shutil.copy('manifest.json', final_dir)
    
    content_root_path:str = path.join(dicionario['diretorio_raiz'] if len(dicionario['diretorio_raiz']) > 0 else os.getcwd(), dicionario['diretorio_raiz_conteudo'])

    if len(dicionario['pastas_copiar']) > 0:
        for i in dicionario['pastas_copiar']:
            copiar_pasta(path.join(content_root_path, i), path.join(final_content_dir, i))

    for file in dicionario['arquivos']:
        origin_path:str = path.join(dicionario['diretorio_raiz'] , file.replace('/', '\\'))
        final_path:str = path.join(final_dir, file.replace('/', '\\'))


        if path.isfile(origin_path):
            f = '\\'.join([ texto for texto in file.split('/') if not str(texto).endswith('.js')])
            
            if dict(dicionario['arquivos_renomear']).get(file):
                final_path:str = path.join(final_dir, dict(dicionario['arquivos_renomear']).get(file).replace('/', '\\'))
            
            if path.isdir(path.join(dicionario['diretorio_raiz'], f)):
                create_dir(path.join(final_dir, f))

            shutil.copy(origin_path, final_path)
        
    versao:str = get_version(path.join(final_dir, 'manifest.json'))
    
    nem_file_name:str = final_dir + '-' + versao

    recreate_dir(nem_file_name)

    copiar_pasta(final_dir, path.join(nem_file_name,dicionario['pasta_final']) )
    
    print(f'Aquivos salvos em: {nem_file_name}')
    zip_file(path.join(nem_file_name,dicionario['pasta_final']))
    
def recreate_dir(dir_name:str) -> None:
    remove_dir(dir_name)
    create_dir(dir_name)
    
def copiar_pasta(origem, destino):
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

    version:str = ''

    if validar_caminho(file_path):
        
        with open(file_path, 'r') as manifest:
            for line in manifest:
                
                if '"version"' in line.strip():
                    version = line.strip()[11::].replace('"', '').replace(',', '') 

    return version


def zip_file(file_name:str) -> None:

    shutil.make_archive(base_name= file_name, format= 'zip', root_dir= file_name)
    print(f'Aquivos salvos em: {file_name}.zip')
    remove_dir(file_name)
    

def remove_dir(path:str) -> None:
    if validar_caminho(path):
        try:
            shutil.rmtree(path)
        except OSError as e:
            print(f"Erro: {e.strerror}")            


def rename_file(file:str, new_file_name:str) -> None:
    
    if not validar_caminho(file):
        return

    if validar_caminho(new_file_name):
        remove_dir(new_file_name)
        
    os.rename(file, new_file_name)


def run() -> None:
    limpa_tela()
    print('iniciando...')
    
    generate_build()

    print('fim')
    
if __name__ == '__main__':
    run()

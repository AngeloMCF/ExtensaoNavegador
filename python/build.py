import os
import os.path as path
import shutil

debug_mode: bool = True

dicionario:dict = {
    'diretorio_raiz': '',
    'diretorio_raiz_conteudo': 'src',
    'diretorio_saida' : 'build',
    'caminho_manifest' : '',
    'pasta_final' : 'Atalhos',
    'pasta_final_conteudo' : 'Atalhos\src',
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
        
        print(f'Diretorio criado {dir_path}') if debug_mode else 0
    
def validar_caminho(_path:str) -> bool:
    print(f'Pasta ja existe {_path}') if debug_mode and os.path.exists(_path) else 0

    return os.path.exists(_path)

def generate_build():
    
    build_dir:str = path.join(dicionario['diretorio_saida'])
    create_dir(build_dir)
    
    final_dir:str = path.join(dicionario['diretorio_saida'], dicionario['pasta_final'])
    create_dir(final_dir)

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
                print(f'final_path: {final_path}')
            
            if path.isdir(path.join(dicionario['diretorio_raiz'], f)):
                create_dir(path.join(final_dir, f))

            shutil.copy(origin_path, final_path)    
    

def copiar_pasta(origem, destino):
    def ignore_files(dir, files):
        return [f for f in files if '_' in f]

    if validar_caminho(destino):
        return
    
    try:
        shutil.copytree(origem, destino, ignore=ignore_files)
    except FileExistsError:
        print(f'Erro: A pasta de destino já existe. | {destino}')
    except Exception as e:
        print(f"Ocorreu um erro: {e}")


def run() -> None:
    limpa_tela()
    print('iniciando...')
    
    generate_build()

    print('fim')
    
if __name__ == '__main__':
    run()

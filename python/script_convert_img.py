# (OPICIONAL) ambiente virtual
# shell Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# python -m venv venv
# shell ./venv/scripts/activate.ps1 
# cmd venv/Scripts/activate.bat

# pip install -r requirements.txt
# pip install pillow

import os
import os.path

from PIL import Image

def limpa_tela () -> None:
    os.system('cls' if os.name == 'nt' else 'clear')

def validar_caminho(_path:str) -> bool:
    return os.path.exists(input_path)

def remover_fundo_branco(input_path:str, output_path:str) -> None:
    img = Image.open(input_path).convert("RGBA")

    datas = img.getdata()
    newData = []
    for item in datas:
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")

    img.show()

def converter_ico(input_path:str, output_path:str) -> Image:
    img = Image.open(input_path)
    img.save(output_path, format="ICO")
    return img
    
def redimensionar_32_ico(input_path:str, output_path:str) -> None:
    img = converter_ico(input_path, output_path)
     
    output_path_32 = output_path[:-4] + "_converted_32.ico"
    print(output_path_32)

    img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
    img_32.save(output_path_32, format="ICO")
    img_32.show()

limpa_tela()

current_dir = os.getcwd()

# Abrir a imagem enviada
input_path = current_dir + "\python\_input\_teste_fundo_branco.png"
output_path = current_dir + "\python\_output\_teste_fundo_branco.png"

print()

# if (validar_caminho(input_path)):
#     remover_fundo_branco(input_path, output_path)

input_path = output_path

if (validar_caminho(input_path)):
    redimensionar_32_ico(input_path, output_path)


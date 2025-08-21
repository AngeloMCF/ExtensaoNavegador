from PIL import Image

# Abrir a imagem enviada
input_path = "/mnt/data/placeholder_icon_location_128.png"
output_path = "/mnt/data/icon_converted.ico"

# Converter para .ico
img = Image.open(input_path)
img.save(output_path, format="ICO")

output_path


# Redimensionar para 32x32 e salvar como .ico
output_path_32 = "/mnt/data/icon_converted_32.ico"

img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
img_32.save(output_path_32, format="ICO")

output_path_32

#### pascoa logo transparent

from PIL import Image

# Caminhos de entrada e saída
input_path_uploaded = "/mnt/data/logo-placeholder-pascoa.png"
output_path_transparent = "/mnt/data/logo_pascoa_transparent.png"

# Abrir imagem
img = Image.open(input_path_uploaded).convert("RGBA")

# Tornar fundo branco transparente
datas = img.getdata()
newData = []
for item in datas:
    if item[0] > 240 and item[1] > 240 and item[2] > 240:
        newData.append((255, 255, 255, 0))
    else:
        newData.append(item)

img.putdata(newData)
img.save(output_path_transparent, "PNG")

output_path_transparent

###

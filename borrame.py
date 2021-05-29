import os



for file_name in os.listdir():
    new_name = ""

    if file_name[1] != "0":
        new_name = "M0" + file_name[1:]
    else:
        new_name = file_name

    new_name = new_name.lower()

    os.rename(file_name, new_name)
    
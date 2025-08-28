from main import consultar_modelo, seleccionar_sql, generar_sql
from os import name, system

def limpiar():
    if name == "nt":
        system("cls")
    else:
        system("clear")

seg = True
bol = False

while seg:
    limpiar()

    if not bol:
        print("========== Menú de consultorIA ==========\n")
    else:
        print("Elija una opción correcta:\n")
    
    print("0- Salir")
    print("1- Hablar con Gemma")
    print("2- Probar el seleccionador")
    print("3- Probar todo el circuito\n")

    opc = input()
    
    match opc:
        case "1":
            limpiar()
            message = ""

            while (message != "exit"):
                print(">>>", end=" ")
                message = input()

                if message != "exit":
                    print("Gemma:\n", consultar_modelo(message), "\n")
        case "2":
            limpiar()
            message = ""

            while message != "exit":
                print(">>>", end=" ")
                message = input()

                if message != "exit":
                    print("Ember:\n", seleccionar_sql(message), "\n")
        case "3":
            limpiar()
            message = ""

            while message != "exit":
                print(">>>", end=" ")
                message = input()

                if message != "exit":
                    respuesta = generar_sql(message)

                    if respuesta["valida"]:
                        print("Pipeline:\n", respuesta["consulta"], "\n")
                    else:
                        print("Pipeline:\n", respuesta["error_tecnico"], "\n")
        case "0":
            limpiar()
            seg = False
        case _:
            bol = True
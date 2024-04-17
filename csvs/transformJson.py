import os
import pandas as pd
import argparse
import json
parser = argparse.ArgumentParser()
parser.add_argument('-p', '--parent', nargs='*', dest='parents')
args = parser.parse_args()

folder_mri = args.parents[0]

def dataframe_to_json(subjects, json_file):
    # Salva os dados dos sujeitos em formato JSON no arquivo especificado
    with open(json_file, 'w') as file:
        json.dump(subjects, file)

def list_to_json(subjects, json_file):
    # Salva os dados dos sujeitos em formato JSON no arquivo especificado
    with open(json_file, 'w') as file:
        json.dump(subjects, file)

def read_csv_files(root_folder):
    # Dicionário para armazenar os dados dos CSVs para cada sujeito
    subjects = []

    # Itera sobre todas as subpastas na pasta raiz
    for foldername in os.listdir(root_folder):
        folder_path = os.path.join(root_folder, foldername)

        # Verifica se é uma pasta
        if os.path.isdir(folder_path):
            # Dicionário para armazenar os dados do CSV para este sujeito
            subject_data = {}

            # Encontra o caminho para o arquivo CSV desejado
            csv_path_roqs = os.path.join(folder_path, "inCCsight", "roqs_based.csv")
            csv_path_cnn = os.path.join(folder_path, "inCCsight", "cnn_based.csv")

            # Verifica se os arquivos CSV existem
            if os.path.exists(csv_path_roqs):
                # Lê o arquivo CSV e armazena os dados no dicionário do sujeito
                df_roqs = pd.read_csv(csv_path_roqs, delimiter=";")
                subject_data['roqs_based'] = df_roqs.to_dict(orient='records')

            if os.path.exists(csv_path_cnn):
                # Lê o arquivo CSV e armazena os dados no dicionário do sujeito
                df_cnn = pd.read_csv(csv_path_cnn, delimiter=";")
                subject_data['cnn_based'] = df_cnn.to_dict(orient='records')

            # Adiciona os dados do sujeito ao dicionário de sujeitos
            subject_data["Id"] = foldername
            subjects.append(subject_data)

    return subjects

def ajustarDataFrame(subjects):
    # Dicionário ajustado para armazenar os dados dos sujeitos
    subjects_adjusted = {}

    for subject_id, subject_data in subjects.items():
        # Cria um novo dicionário com a chave 'Id' sendo o identificador do sujeito
        subject_adjusted = {}
        for method, method_data in subject_data.items():
            # Ajusta o valor da chave 'Id' para o identificador do sujeito
            for item in method_data:
                item['Id'] = subject_id
            # Atualiza os dados do método no dicionário ajustado do sujeito
            subject_adjusted[method] = method_data
        # Adiciona os dados ajustados do sujeito ao dicionário de sujeitos ajustado
        subjects_adjusted[subject_id] = subject_adjusted

    return subjects_adjusted


# Chama a função para ler os arquivos CSV e criar o DataFrame
subjects = read_csv_files(folder_mri)

#subjects = ajustarDataFrame(subjects)

try:
    list_to_json(subjects, "./src/data/data.json")
except:
    print("Erro.")
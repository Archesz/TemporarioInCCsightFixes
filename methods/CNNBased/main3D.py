from unet_module import LightningMRICCv2
from predict3D import test_predict
import glob
import os
import time
from script import rename_files
import argparse
import warnings
warnings.filterwarnings('ignore') 

parser = argparse.ArgumentParser()
parser.add_argument('-p', '--parent', nargs='*', dest='parents')

args = parser.parse_args()

folders_mri = args.parents  # Renomeando para folders_mri para indicar que é uma lista de pastas
all_subjects = []

path_Data = ""

pre_trained_model_path = os.path.join(path_Data, "methods/CNNBased/peso/3DExperimentV2_ManualMask_FAepoch=362-val_loss=0.13.ckpt")

model = LightningMRICCv2.load_from_checkpoint(pre_trained_model_path).eval().cpu()

for folder in folders_mri:
    rename_files(folder)

all_subjects = []

for folder_mri in folders_mri:  # Iterar sobre cada pasta em folders_mri
    subjects = glob.glob(os.path.join(folder_mri, "*"))

    for subject in subjects:
        all_subjects.append(subject)


start_time = time.time()
vol_data, test_outputs, pos_process, vol_data_affine = test_predict(model, all_subjects)

end_time = time.time()

time = end_time - start_time

print(f"Tempo processado Total (CNN_based): {time:.2f} segundos.")
    
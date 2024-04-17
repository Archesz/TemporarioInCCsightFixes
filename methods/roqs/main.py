import argparse
import glob
import os
import segmentation as sg

import warnings
warnings.filterwarnings('ignore') 

# Read input path
parser = argparse.ArgumentParser()
parser.add_argument('-p', '--parent', nargs='*', dest='parents')

args = parser.parse_args()
    
# Read files
folders_mri = args.parents  # Renomeando para folders_mri para indicar que é uma lista de pastas
all_subjects = []

for folder_mri in folders_mri:  # Iterar sobre cada pasta em folders_mri
    subjects = glob.glob(os.path.join(folder_mri, "*"))

    for subject in subjects:
        all_subjects.append(subject)

sg.get_segm(all_subjects)
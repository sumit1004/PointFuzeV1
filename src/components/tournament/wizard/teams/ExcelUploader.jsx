import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileSpreadsheet, Download, UploadCloud } from 'lucide-react';
import { downloadTemplate } from '../../../../utils/excel/downloadTemplate';
import Button from '../../../ui/Button';

const ExcelUploader = ({ gameId, onFileSelected }) => {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles?.length > 0) {
      onFileSelected(acceptedFiles[0]);
    }
  }, [onFileSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    maxFiles: 1
  });

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-center bg-[rgba(255,255,255,0.02)] p-4 rounded-lg border border-[rgba(255,255,255,0.05)]">
        <div>
          <h4 className="font-semibold mb-1">1. Download Template</h4>
          <p className="text-xs text-text-secondary">Get the pre-formatted Excel file for your selected game.</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => downloadTemplate(gameId)} className="flex gap-2 items-center">
          <Download size={16} /> Template.xlsx
        </Button>
      </div>

      <div>
        <h4 className="font-semibold mb-2">2. Upload Filled Template</h4>
        <div 
          {...getRootProps()} 
          className={`w-full p-10 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
            isDragActive 
              ? 'border-primary bg-[rgba(255,122,0,0.05)] scale-[1.02]' 
              : 'border-[rgba(255,255,255,0.2)] hover:border-primary hover:bg-[rgba(255,255,255,0.02)]'
          }`}
        >
          <input {...getInputProps()} />
          <div className={`p-4 rounded-full mb-4 ${isDragActive ? 'bg-primary text-white shadow-glow' : 'bg-[rgba(255,255,255,0.05)] text-text-secondary'}`}>
            <UploadCloud size={32} />
          </div>
          <p className="text-lg font-medium mb-1">
            {isDragActive ? 'Drop your Excel file here' : 'Drag & drop your Excel file here'}
          </p>
          <p className="text-sm text-text-secondary">or click to browse from your computer</p>
          <p className="text-xs text-text-secondary mt-4 opacity-50">Supports .xlsx and .xls only</p>
        </div>
      </div>
    </div>
  );
};

export default ExcelUploader;

import { useState } from 'react';

export default function ImageUploader({ onUpload }) {
  const [preview, setPreview] = useState('');

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-uploader">
      <label className="upload-button">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleChange} 
          style={{ display: 'none' }}
        />
        Selecionar Imagem
      </label>
      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Preview" />
        </div>
      )}
    </div>
  );
}
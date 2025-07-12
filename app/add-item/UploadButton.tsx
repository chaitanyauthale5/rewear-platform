



import React, { useState } from 'react';

const UploadButton: React.FC = () => {
  const [buttonText, setButtonText] = useState<string>('Upload');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleClick = (): void => {
    setButtonText('Uploading...');
    setIsDisabled(true);

    setTimeout(() => {
      setButtonText('Uploaded');
      setIsDisabled(false);
      alert('Uploaded successfully');
    }, 2000); // 5 seconds
  };

  return (
    <button
  onClick={handleClick}
  disabled={isDisabled}
  style={{
    backgroundColor: 'green',
    color: 'white',
    padding: '12px 24px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    width: '300px', // ✅ Increased width here
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
  }}
>
  {buttonText}
</button>

  );
};

export default UploadButton;

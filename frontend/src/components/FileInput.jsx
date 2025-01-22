const FileInput = ({ onFileSelect }) => (
    <input type="file" onChange={(e) => onFileSelect(e.target.files[0])}></input>
);

export default FileInput;
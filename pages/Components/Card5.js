import React, { useEffect, useState } from 'react';

const Card5 = (props) => {
    const [diagnosis, setDiagnosis] = useState(''); 

  const [columns, setColumns] = useState([
    { name: 'Medicine', value: '', col: "Medicine" },
    { name: 'Timesperday', value: '', col: "Times Per Day" },
    { name: 'Days', value: '', col: "Days" },
  ]);

  const [rows, setRows] = useState([
    { medicine: '', timesperday: '', days: '' },
  ]);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [IsSButtonEnabled, setIsSButtonEnabled] = useState(false);

  const handleAddRow = () => {
    setRows([...rows, { medicine: '', timesperday: '', days: '' }]);
    setIsButtonEnabled(false);
  };

  const handleInputChange = (e, rowIndex) => {
    const { name, value } = e.target;
    setRows(rows.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [name]: value };
      }
      return row;
    }));
  };

  useEffect(() => {
    const areAllRowsFilled = rows.every((row, index) => {
      return Object.values(row).every((value) => value !== '');
    });
    
    const diag = diagnosis == ""
    setIsButtonEnabled(areAllRowsFilled);
    setIsSButtonEnabled(diag)
  }, [rows,diagnosis]);

  const handleDiagnosisChange = (e) => {
    setDiagnosis(e.target.value);
  };

  const handleSubmit =()=>{
    const data={
        name:props.name,
        doctor:props.doctor,
        date:props.date,
        prescription:rows,
        diagnosis:diagnosis

    }
    // make fetch post request
    fetch('/api/prescription', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
            })
  }

  return (
    <div style={{ 
      background: "white", 
      width: "100%", 
      padding: "24px", 
      maxWidth: "1000px", 
      marginBottom: "10px", 
      borderRadius: "10px", 
      marginTop: "40px", 
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" 
    }}>
      <h4 style={{ marginBottom: "16px" }}>Diagnosis</h4>
      <input 
        type='text' 
        style={{ 
          width: "100%", 
          height: "40px", 
          padding: "10px", 
          fontSize: "16px", 
          border: "1px solid #ccc", 
          borderRadius: "5px" 
        }}
        value={diagnosis}
        onChange={handleDiagnosisChange}
      />
      <h4 style={{ marginTop: "16px", marginBottom: "16px" }}>Medicines</h4>
      <table style={{ 
        width: "100%", 
        borderCollapse: "collapse", 
        borderSpacing: "0" 
      }}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th 
                key={index} 
                style={{ 
                  padding: "10px", 
                //   border: "1px solid #ccc", 
                  backgroundColor: "rgba(34, 53, 239, 0.8)",
                  color: "white",
                  border: "1px solid #fff" 

                }}
              >
                {column.col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td 
                  key={columnIndex} 
                  style={{ 
                    padding: "10px", 
                    border: "1px solid #ccc" 
                  }}
                >
                  <input
                    type="text"
                    name={column.name.toLowerCase().replace(' ', '')}
                    value={row[column.name.toLowerCase().replace(' ', '')]}
                    onChange={(e) => handleInputChange(e, rowIndex)}
                    style={{ 
                      width: "100%", 
                      height: "30px", 
                      padding: "5px", 
                      fontSize: "14px", 
                      border: "1px solid #ccc", 
                      borderRadius: "5px" 
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex",gap:"10px", justifyContent: "flex-end" }}>
        <button 
          onClick={handleAddRow} 
          disabled={!isButtonEnabled} 
          style={{ 
            marginTop: "16px", 
            padding: "10px 20px", 
            fontSize: "16px", 
            border: "none", 
            borderRadius: "5px", 
            backgroundColor: isButtonEnabled ? "rgba(59, 96, 220, 0.8)" : "#ccc", 
            color: "#fff", 
            cursor: "pointer" 
          }}
        >
          Add Row
        </button>
        <button 
          onClick={handleSubmit} 
          disabled={!isButtonEnabled && IsSButtonEnabled} 
          style={{ 
            marginTop: "16px", 
            padding: "10px 20px", 
            fontSize: "16px", 
            border: "none", 
            borderRadius: "5px", 
            backgroundColor: (isButtonEnabled && !IsSButtonEnabled) ? "rgba(59, 96, 220, 0.8)" : "#ccc", 
            color: "#fff", 
            cursor: "pointer" 
          }}
        >
          Submit
        </button>
      </div>

    </div>
  );
};

export default Card5;
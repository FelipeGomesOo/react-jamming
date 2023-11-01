import React, { createContext, useState, useEffect } from 'react';

export const ConfigContext = createContext();

 export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/jamming/config.json');  
        if (response.ok) {
          const configData = await response.json(); 
          setConfig(configData); 
        } else { 
          throw new Error('Falha ao buscar o arquivo de configuração'); 
        }
      } catch (error) {
        console.log(`Não deu certo: ${error}`);  
      }
    };
    fetchConfig();
  }, []);
  if (!config) {
    // Trate o caso em que config ainda não foi carregado
    return <div>Loading...</div>;
  } 

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}
 
 
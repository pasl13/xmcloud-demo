import React from 'react';

const GovernmentManagement = (): JSX.Element => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/government/official', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao criar o governo');
      }

      const data = await response.json();
      console.log('Governo criado:', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="component-content">
        <p>Teste Component</p>
        {/* Formulário simples para capturar os dados */}
        <form onSubmit={handleSubmit}>
          <button type="submit">Criar Governo</button>
        </form>
      </div>
    </div>
  );
};

export default GovernmentManagement;

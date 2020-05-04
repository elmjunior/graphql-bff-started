const axios = require('axios');

const apiUrl = 'https://api.movidesk.com/public/v1/tickets';
const token = 'aec18c9a-6db2-449b-8559-ac4391d17b8f';

exports.createTicket = async feedback => {
  if (!feedback || !feedback.description || !feedback.description.length) return false;

  const { condominium } = feedback;

  const ticket = {
    type: 2,
    subject: 'Feedback app',
    category: 'Sugestao',
    serviceFirstLevel: 'Feedbacks APP',
    serviceFirstLevelId: 221858,
    actions: [
      {
        type: 2,
        description: `
          <strong>${feedback.name}</strong> (${feedback.email}) avaliou o app com <strong>${
          feedback.amount
        }</strong> estrela${feedback.amount > 1 ? 's' : ''}.<br /><br />
          É residente do ${condominium.name || '---'};<br>
          Pertence a unidade ${condominium.unit} e ao grupo ${condominium.unitGroup}
          ${condominium && condominium.unitGroup}, do parceiro ${feedback.codeClientSegware ||
          '---'}
          <br /> <br />
          Mensagem: <br />
            ${feedback.description}
          <br /><br />
          ####################### <br />
          ####################### <br />
          Ticket aberto automaticamente. <br />
          ####################### <br />
          ####################### <br />
       `,
      },
    ],
    clients: [
      {
        id: 31559635,
      },
    ],
    createdBy: {
      id: 31559635,
    },
  };

  try {
    await axios.post(`${apiUrl}?token=${token}`, ticket);
    return true;
  } catch (error) {
    return false;
  }
};

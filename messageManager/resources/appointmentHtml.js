const htmlAppointmentTable = () => {
  return '<p><br></p><table style="border:1px solid #C0C0C0;padding:5px;"><thead><tr><th colspan="2" style="width: 500px;"><div style="text-align: center; background:#86F3C2;border:1px solid #C0C0C0;">Datos de la cita</div></th></tr></thead><tbody><tr><td>&nbsp;Nombre&nbsp;</td><td>[[CLIENTNAME]]</td></tr><tr><td>&nbsp;Fecha:</td><td>&nbsp;[[DATE]]</td></tr><tr><td>&nbsp;Hora:</td><td>&nbsp;[[TIME]]</td></tr><tr><td>&nbsp;Lugar:</td><td>&nbsp;[[PLACE]]</td></tr><tr><td>&nbsp;Direcci&oacute;n:</td><td>&nbsp;[[ADDRESS]]</td></tr></tbody></table><p><br></p><p><br></p><p><img src="blob:https://froala.com/b2b221e5-29c8-49f4-9ffc-383cf77aba30" style="width: 300px;" class="fr-fic fr-dii"></p><p><br></p>';
};

exports.htmlAppointmentTable = htmlAppointmentTable;

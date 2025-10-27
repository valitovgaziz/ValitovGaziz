function saveContact() {
    // Создаем содержимое vCard (VCF)
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Валитов Газиз Камилевич
N:Валитов;Газиз;Камилевич
ORG:FREELANCE
TITLE:FULLSTACK_DEVELOPER
TEL;TYPE=MOBILE:+79279238823
TEL;TYPE=MOBILE:+79044513441
TEL;TYPE=MOBILE:+79625439243
EMAIL;TYPE=HOME:valitovgaziz@gmail.com
EMAIL;TYPE=WORK:valitovgaziz@yandex.ru
URL:https://valitovgaziz.ru
URL:https://t.me/valitovgaziz
URL:https://vk.ru/id378105199
BDAY:1985-10-27
END:VCARD`;

    // Создаем Blob (бинарный объект) с данными vCard
    const blob = new Blob([vCardData], { type: 'text/vcard' });

    // Создаем URL для скачивания
    const url = URL.createObjectURL(blob);

    // Создаем временную ссылку для скачивания
    const link = document.createElement('a');
    link.href = url;
    link.download = 'valitovgaziz.vcf'; // Имя файла
    link.click();

    // Освобождаем память
    URL.revokeObjectURL(url);
}

function loadTermSheet() {
  // Create a temporary anchor element
  const link = document.createElement('a');
  
  // Set correct relative path to the PDF file
  link.href = './assets/docs/TermSheet.pdf';
  
  // Set download attribute with filename
  link.download = 'TermSheet.pdf';
  
  // Append to body to make it work in some browsers
  document.body.appendChild(link);
  
  // Trigger the download
  link.click();
  
  // Clean up
  document.body.removeChild(link);
}


// Обработчик для кнопки "Запросить презентацию"
function sendMessageTelegramm() {
  const message = prompt("Введите ваши контакты для получения информации от Газиза:");
  if (message) {
    const BOT_TOKEN = "8470ҡғ85635:AAEPZcsN3n-3FkMdr7DzxваQ3q8mрZTGwug";
    const CHAT_ID = "559861569";

    // Используем FormData вместо JSON (более надежно)
    const formData = new FormData();
    formData.append('chat_id', CHAT_ID);
    formData.append('text', `📥 Новая заявка с сайта ValitovGaziz:\n\n${message}`);
    formData.append('parse_mode', 'HTML');

    // Альтернативный URL
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        alert("Сообщение успешно отправлено!");
      } else {
        console.error('Telegram API Error:', data);
        alert("Ошибка: " + (data.description || 'Неизвестная ошибка'));
      }
    })
    .catch(error => {
      console.error("Ошибка:", error);
      alert("Произошла ошибка сети. Попробуйте позже.");
    });
  }
  saveContact();
  loadTermSheet();
}

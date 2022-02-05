function forms() {
  // FORMS

  const forms = document.querySelectorAll('form');
  const messeges = {
    loading: 'img/form/spinner.svg',
    success: 'Thanks! We will contact you!',
    failure: 'Something went wrong...'
  }

  forms.forEach(item => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });

    return await res.json();
  };



  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = messeges.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        width: 50px;
        height: 50px;
        background: red;
        border-radius: 50%;
      `;

      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      const json = JSONM.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then(data => data.text())
        .then(data => {
          console.log(data);
          showThanksModal(messeges.success);
          statusMessage.remove();
        }).catch(() => {
          showThanksModal(messeges.failure);
        }).finally(() => {
          form.reset();
        });

    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" data-close>&times;</div>
      <div class"modal__title">${message}</div>
    </div>
    `;

    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }

}

module.exports = forms;
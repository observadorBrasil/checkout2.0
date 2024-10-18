document.addEventListener('DOMContentLoaded', function () {
  // Referências para as etapas do formulário
  const nextButton1 = document.getElementById('next-button-1');
  const nextButton2 = document.getElementById('next-button-2');
  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const step3 = document.getElementById('step-3');
  
  // Referências para a seção de parcelas e método de pagamento
  const parcelasSection = document.getElementById('parcelas-section');
  const paymentOptions = document.getElementsByName('payment-method');
  const parcelSelect = document.getElementById('parcel-select');
  const petSelect = document.getElementById('pet-select');
  const valorCurso = document.getElementById('valorcurso');

  // Função para formatar números como moeda (R$)
  function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  // Função para atualizar a quantidade de parcelas
  function atualizarParcelas(maxParcelas) {
    const selectedValue = parseFloat(petSelect.value); // Converte o valor selecionado para número

    if (selectedValue) {
      // Limpa as opções de parcelas e calcula as novas opções
      parcelSelect.innerHTML = '<option value="">--Por favor, escolha uma opção--</option>';
  
      for (let i = 1; i <= maxParcelas; i++) {
        const valorParcela = selectedValue / i;
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i}x de ${formatCurrency(valorParcela)}`;
        parcelSelect.appendChild(option);
      }
    } else {
      parcelSelect.innerHTML = '<option value="">--Por favor, escolha uma opção--</option>'; // Reseta as parcelas
    }
  }

  // Função para exibir o valor do curso ao selecionar um curso
  petSelect.addEventListener('change', function () {
    const selectedValue = parseFloat(petSelect.value);
    if (selectedValue) {
      valorCurso.textContent = `Valor: R$ ${selectedValue.toFixed(2)}`;
    } else {
      valorCurso.textContent = 'Valor:';
    }
  });

  // Função para alternar a exibição de parcelas e definir o número máximo de parcelas
  paymentOptions.forEach(function(option) {
    option.addEventListener('change', function() {
      if (this.value === 'cartao') {
        parcelasSection.style.display = 'block'; // Mostra parcelas se for "Cartão"
        atualizarParcelas(6); // Cartão de crédito: até 6 vezes
      } else if (this.value === 'boleto') {
        parcelasSection.style.display = 'block'; // Mostra parcelas se for "Boleto"
        atualizarParcelas(12); // Boleto: até 12 vezes
      } else {
        parcelasSection.style.display = 'none'; // Esconde parcelas se for "Pix"
      }
    });
  });

  // Função para avançar da etapa 1 para a etapa 2
  nextButton1.addEventListener('click', function () {
    step1.style.display = 'none';
    step2.style.display = 'block';
  });

  // Função para avançar da etapa 2 para a etapa 3
  nextButton2.addEventListener('click', function () {
    step2.style.display = 'none';
    step3.style.display = 'block';
  });

  // Atualização do número do cartão em tempo real
  $('.input-cart-number').on('keyup change', function () {
    $t = $(this);
    if ($t.val().length > 3) {
      $t.next().focus();
    }

    var card_number = '';
    $('.input-cart-number').each(function () {
      card_number += $(this).val() + ' ';
      if ($(this).val().length == 4) {
        $(this).next().focus();
      }
    });
    $('.credit-card-box .number').html(card_number);
  });

  $('#card-holder').on('keyup change', function () {
    $t = $(this);
    $('.credit-card-box .card-holder div').html($t.val());
  });

  $('#card-expiration-month, #card-expiration-year').change(function () {
    let m = $('#card-expiration-month option').index($('#card-expiration-month option:selected'));
    m = (m < 10) ? '0' + m : m;
    const y = $('#card-expiration-year').val().substr(2, 2);
    $('.card-expiration-date div').html(m + '/' + y);
  });

  $('#card-ccv').on('focus', function () {
    $('.credit-card-box').addClass('hover');
  }).on('blur', function () {
    $('.credit-card-box').removeClass('hover');
  }).on('keyup change', function () {
    $('.ccv div').html($(this).val());
  });
});

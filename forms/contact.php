<?php
  /**
  * Autor: Taufique Quimo
  * Este arquivo foi desenvolvido por Taufique Quimo.
  * 
  * Requer a biblioteca "PHP Email Form"
  * A biblioteca "PHP Email Form" está disponível apenas na versão pro do template
  * A biblioteca deve ser carregada em: vendor/php-email-form/php-email-form.php
  * Para mais informações e ajuda: https://bootstrapmade.com/php-email-form/
  */

  // Substitua contact@example.com pelo seu endereço de email real para recebimento
  $receiving_email_address = 'taufiquequimo@gmail.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Não foi possível carregar a biblioteca "PHP Email Form"!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['subject'];

  // Descomente o código abaixo se quiser usar SMTP para enviar emails. Insira suas credenciais SMTP corretas.
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  $contact->add_message( $_POST['name'], 'De');
  $contact->add_message( $_POST['email'], 'Email');
  $contact->add_message( $_POST['message'], 'Mensagem', 10);

  echo $contact->send();
?>
  echo $contact->send();
?>

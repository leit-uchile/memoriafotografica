import React from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "reactstrap";

const TermsOfUseModal = ({
  isOpen,
  toggleFunc,
  acceptTerms,
  className,
}) => (
  <Modal isOpen={isOpen} toggle={toggleFunc} className={className}>
    <ModalHeader toggle={toggleFunc}>T&eacute;rminos de uso</ModalHeader>
    <ModalBody>
      <p>
        La Biblioteca Central de la FCFM, respondiendo a su misión de
        centralizar, sistematizar y poner a disposición información de interés
        para la comunidad, ofrece al público una recopilación de fotografías que
        evocan la historia de la Escuela de InJeniería de la Universidad de
        Chile, de quienes han pasado por ella y de los hitos que han marcado su
        trayectoria desde sus comienzos hasta la actualidad. <br />
        <br />
        El acceso a la información de este sitio web es gratuito y no requiere
        registro previo. Sin perjuicio de ello, es necesario registrarse tanto
        para solicitar información o el uso de las imágenes del sitio, como para
        aportarla. <br />
        <br />
        Esta plataforma tiene por finalidad la consolidación de un espacio
        participativo destinado a preservar la memoria de esta Facultad, por lo
        que cualquier persona puede contribuir mediante la aportación de
        material fotográfico o de los antecedentes que conozca respecto de
        cualquiera de las imágenes expuestas. Para facilitar este proceso, el
        usuario puede crear una cuenta desde la cual interactuar con el sitio.{" "}
        <br />
        <br />
        Los contenidos de este portal están protegidos por la{" "}
        <b>Ley 17.336 sobre Propiedad Intelectual</b>, por lo que la Universidad
        sólo puede conceder licencias de uso respecto de las imágenes sobre las
        que tiene titularidad. Cuando sean solicitadas licencias sobre
        materiales ajenos a la misma, se remitirá al usuario la información de
        su respectivo titular para que este pueda dirigirse ante quien
        corresponda.
        <br />
        <br />
        La Biblioteca se reserva el derecho de administrar, crear y modificar
        los contenidos, las prestaciones y servicios que ofrece esta plataforma,
        siendo todos ellos susceptibles de cambio sin que exista obligación para
        la Biblioteca de comunicarlo a sus usuarios.
      </p>
    </ModalBody>
    <ModalFooter>
      <Button
        color="primary"
        onClick={(e) => {
          acceptTerms();
          toggleFunc(e);
        }}
      >
        Acepto los t&eacute;rminos de uso de la plataforma
      </Button>{" "}
    </ModalFooter>
  </Modal>
);

export default TermsOfUseModal;

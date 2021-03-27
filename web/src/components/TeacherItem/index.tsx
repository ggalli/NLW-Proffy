import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css'

function TeacherItem() {
	return (
		<article className="teacher-item">
			<header>
				<img src="https://avatars.githubusercontent.com/u/32558216?s=460&u=639cb0aefceae589bab2b556fe5034df50aa8a88&v=4" alt="Guilherme Galli" />
				<div>
					<strong>Guilherme Galli</strong>
					<span>Química</span>
				</div>
			</header>

			<p>
				Entusiasta das melhores tecnologias de química avançada.
				<br /><br />
				Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.
			</p>

			<footer>
				<p>
					Preço/Hora
					<strong>R$ 80,00</strong>
				</p>
				<button type="button">
					<img src={whatsappIcon} alt="whatsapp" />
					Entrar em contato
				</button>
			</footer>
		</article>
	)
}

export default TeacherItem;
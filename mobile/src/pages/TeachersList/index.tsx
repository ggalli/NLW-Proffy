import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import { Feather } from '@expo/vector-icons';

import styles from './styles';
import api from '../../services/api';

function TeachersList() {
	const [isFiltersVisible, setIsFiltersVisible] = useState(false);
	const [teachers, setTeachers] = useState([]);
	const [favorites, setFavorites] = useState<number[]>([]);

	const [subject, setSubject] = useState('');
	const [weekDay, setWeekDay] = useState('');
	const [time, setTime] = useState('');

	function loadFavorites() {
		AsyncStorage.getItem('favorites').then(response => {
			if (response) {
				const favoritedTeachers = JSON.parse(response);
				const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
					return teacher.id;
				});

				setFavorites(favoritedTeachersIds);
			}
		});
	}

	function toggleFiltersVisible() {
		setIsFiltersVisible(!isFiltersVisible);
	}

	async function handleFiltersSubmit() {
		loadFavorites();
		
		const response = await api.get('classes', {
			params: {
				subject,
				week_day: weekDay,
				time,
			}
		});

		setIsFiltersVisible(false);
		setTeachers(response.data);
	}

	return (
		<View style={styles.container}>
			<PageHeader
				title='Proffys disponívies'
				headerRight={(
					<BorderlessButton onPress={toggleFiltersVisible}>
						<Feather name='filter' size={20} color='#fff' />
					</BorderlessButton>
				)}
			>
				{isFiltersVisible && (
					<View style={styles.searchForm}>
						<Text style={styles.label}>Matéria</Text>
						<TextInput
							style={styles.input}
							placeholder='Qual a matéria?'
							value={subject}
							onChangeText={text => setSubject(text)}
						/>

						<View style={styles.inputGroup}>
							<View style={styles.inputBlock}>
								<Text style={styles.label}>Dia da semana</Text>
								<TextInput
									style={styles.input}
									placeholder='Qual o dia?'
									value={weekDay}
									onChangeText={text => setWeekDay(text)}
								/>
							</View>

							<View style={styles.inputBlock}>
								<Text style={styles.label}>Horário</Text>
								<TextInput
									style={styles.input}
									placeholder='Qual horário?'
									value={time}
									onChangeText={text => setTime(text)}
								/>
							</View>
						</View>

						<RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
							<Text style={styles.submitButtonText}>Filtrar</Text>
						</RectButton>
					</View>
				)}
			</PageHeader>

			<ScrollView
				style={styles.teacherList}
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 16
				}}
			>
				{teachers.map((teacher: Teacher) => <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />)}
			</ScrollView>

		</View>
	)
}

export default TeachersList;
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { User } from '../types';

export default function ProfileScreen({ user, onBack }: { user: User; onBack: () => void })
{
	const cursus = user.cursus_users.find(c => c.cursus_id === 21)
		?? user.cursus_users[user.cursus_users.length - 1];
	const level = cursus ? cursus.level : 0;
	const skills = cursus ? cursus.skills : [];
	const projects = user.projects_users.filter(p => p.status === 'finished');

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<TouchableOpacity onPress={onBack} style={styles.back}>
				<Text style={styles.backText}>← Back</Text>
			</TouchableOpacity>

			{user.image.link && (
				<Image source={{ uri: user.image.link }} style={styles.photo} />
			)}
			<Text style={styles.name}>{user.displayname}</Text>
			<Text style={styles.login}>{user.login}</Text>

			<View style={styles.card}>
				<Text style={styles.row}>Email: {user.email}</Text>
				<Text style={styles.row}>Level: {level.toFixed(2)}</Text>
				<Text style={styles.row}>Wallet: {user.wallet}</Text>
				<Text style={styles.row}>Evaluation points: {user.correction_point}</Text>
				<Text style={styles.row}>Location: {user.location ?? 'Unavailable'}</Text>
			</View>

			<Text style={styles.section}>Skills</Text>
			{skills.map(s =>
			{
				const percent = Math.min((s.level / 20) * 100, 100);
				return (
					<View key={s.id} style={styles.skill}>
						<Text>{s.name}: {s.level.toFixed(2)} ({percent.toFixed(0)}%)</Text>
						<View style={styles.barBg}>
							<View style={[styles.barFill, { width: `${percent}%` }]} />
						</View>
					</View>
				);
			})}

			<Text style={styles.section}>Projects</Text>
			{projects.map(p => (
				<View key={p.id} style={styles.project}>
					<Text style={styles.projectName}>{p.project.name}</Text>
					<Text style={{ color: p['validated?'] ? 'green' : 'red' }}>
						{p.final_mark ?? '-'} {p['validated?'] ? '✓' : '✗'}
					</Text>
				</View>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	content: {
		padding: 20,
		paddingTop: 50,
		alignItems: 'center'
	},
	back: {
		alignSelf: 'flex-start',
		marginBottom: 10
	},
	backText: {
		fontSize: 18
	},
	photo: {
		width: 140,
		height: 140,
		borderRadius: 70,
		marginBottom: 10
	},
	name: {
		fontSize: 24,
		fontWeight: 'bold' 
	},
	login: {
		fontSize: 16,
		color: '#666',
		marginBottom: 15
	},
	card: {
		width: '100%',
		maxWidth: 500,
		padding: 15,
		borderRadius: 8,
		backgroundColor: '#f2f2f2'
	},
	row: {
		fontSize: 16,
		marginBottom: 6
	},
	section: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 25,
		marginBottom: 10,
		alignSelf: 'flex-start'
	},
	skill: {
		width: '100%',
		maxWidth: 500,
		marginBottom: 10
	},
	barBg: {
		height: 8,
		backgroundColor: '#ddd',
		borderRadius: 4,
		marginTop: 4
	},
	barFill: {
		height: 8,
		backgroundColor: '#000',
		borderRadius: 4
	},
	project: {
		width: '100%',
		maxWidth: 500,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#eee'
	},
	projectName: {
		fontSize: 16,
		flexShrink: 1,
		marginRight: 10
	},
});
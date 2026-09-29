import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { User } from '../types';
import { colors} from '../theme';
import { styles } from '../style/styleProfileScreen';

type Tab = 'skills' | 'projects';

function InfoWalletEvalPoints({ label, value }: { label: string; value: string | number }) //funcoin auxiliar para los recuadros de wallet y eval points
{
	return (
		<View style={styles.InfoWalletEvalPoints}>
			<Text style={styles.statValue}>{value}</Text>
			<Text style={styles.statLabel}>{label}</Text>
		</View>
	);
}

function InfoLogin({ label, value, last }: { label: string; value: string; last?: boolean }) //funcoin auxiliar para la informacion de email y localizacion
{
	return (
		<View style={[styles.InfoLogin, last && styles.InfoLoginLast]}>
			<Text style={styles.infoLabel}>{label}</Text>
			<Text style={styles.infoValue}>{value}</Text>
		</View>
	);
}

export default function ProfileScreen({ user, onBack }: { user: User; onBack: () => void })
{
	const [tab, setTab] = useState<Tab>('skills');

	const cursus = user.cursus_users.find(c => c.cursus_id === 21) //21 porque es el common core
		?? user.cursus_users[user.cursus_users.length - 1]; // ?? si lo primero es null utilizado lo segundo(que es el ultimo curso que tenga)
	const level = cursus ? cursus.level : 0;
	const levelInt = Math.floor(level);
	const levelDecimals = (level % 1).toFixed(2).slice(2); //"12.01" -> "01"
	const levelPercent = (level % 1) * 100; //la parte decimal es el progreso al siguiente nivel
	const skills = cursus ? [...cursus.skills].sort((a, b) => b.level - a.level) : []; //copia as skills y ordenalas
	const projects = user.projects_users.filter(p => p.status === 'finished'); //solo los proyectos finalizados
	const passed = projects.filter(p => p['validated?']).length;
	const failed = projects.length - passed;

	return (
		<View style={styles.container}>
			<StatusBar style="light" />

			{/* Barra superior fija: no se mueve con el scroll */}
			<View style={styles.topBar}>
				<TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.6}>
					<Text style={styles.backText}>‹ Back</Text>
				</TouchableOpacity>
				<Text style={styles.topTitle}>Profile</Text>
				<View style={styles.backButton} />
			</View>

			<ScrollView contentContainerStyle={styles.content}>
				{/* Cabecera del usuario */}
				<View style={styles.hero}>
					<View style={styles.avatarRing}>
						{user.image.link
							? <Image source={{ uri: user.image.link }} style={styles.avatar} />
							: (
								<View style={[styles.avatar, styles.avatarPlaceholder]}>
									<Text style={styles.avatarInitial}>{user.login[0].toUpperCase()}</Text>
								</View>
							)}
					</View>
					<View style={styles.heroInfo}>
						<Text style={styles.name}>{user.displayname}</Text>
						<View style={styles.loginPill}>
							<Text style={styles.loginText}>@{user.login}</Text>
						</View>
					</View>
				</View>

				{/* Nivel */}
				<View style={styles.card}>
					<Text style={styles.cardLabel}>LEVEL</Text>
					<View style={styles.levelRow}>
						<Text style={styles.levelInt}>{levelInt}</Text>
						<Text style={styles.levelDecimals}>.{levelDecimals}</Text>
						<Text style={styles.levelPercent}>{levelPercent.toFixed(0)}% to next</Text>
					</View>
					<View style={styles.barBg}>
						<View style={[styles.barFill, { width: `${levelPercent}%` }]} />
					</View>
				</View>

				{/* Números destacados */}
				<View style={styles.statsRow}>
					<InfoWalletEvalPoints label="Wallet" value={user.wallet} />
					<InfoWalletEvalPoints label="Eval points" value={user.correction_point} />
				</View>

				{/* Detalles */}
				<View style={styles.card}>
					<InfoLogin label="Email" value={user.email} />
					<InfoLogin label="Location" value={user.location ?? 'Unavailable'} last />
				</View>

				{/* Selector Skills / Projects */}
				<View style={styles.segment}>
					<TouchableOpacity
						style={[styles.segmentItem, tab === 'skills' && styles.segmentActive]}
						onPress={() => setTab('skills')}
					>
						<Text style={[styles.segmentText, tab === 'skills' && styles.segmentTextActive]}>
							Skills
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.segmentItem, tab === 'projects' && styles.segmentActive]}
						onPress={() => setTab('projects')}
					>
						<Text style={[styles.segmentText, tab === 'projects' && styles.segmentTextActive]}>
							Projects
						</Text>
					</TouchableOpacity>
				</View>

				{tab === 'skills' && (
					<View style={styles.card}>
						{skills.map(s =>
						{
							const percent = Math.min((s.level / 20) * 100, 100); //tomamos el 100% como el nivel 20
							return (
								<View key={s.id} style={styles.skill}>
									<View style={styles.skillRow}>
										<Text style={styles.skillName}>{s.name}</Text>
										<Text style={styles.skillValue}>
											{s.level.toFixed(2)} · {percent.toFixed(0)}%
										</Text>
									</View>
									<View style={styles.barBg}>
										<View style={[styles.barFill, { width: `${percent}%` }]} />
									</View>
								</View>
							);
						})}
					</View>
				)}

				{tab === 'projects' && (
					<>
						{/* Resumen: validados y fallidos */}
						<View style={styles.summaryRow}>
							<View style={[styles.summary, { backgroundColor: colors.successSoft }]}>
								<Text style={[styles.summaryNumber, { color: colors.success }]}>{passed}</Text>
								<Text style={styles.summaryLabel}>Validated</Text>
							</View>
							<View style={[styles.summary, { backgroundColor: colors.dangerSoft }]}>
								<Text style={[styles.summaryNumber, { color: colors.danger }]}>{failed}</Text>
								<Text style={styles.summaryLabel}>Failed</Text>
							</View>
						</View>

						<View style={styles.card}>
							{projects.map(p =>
							{
								const ok = p['validated?'];
								const color = ok ? colors.success : colors.danger;
								return (
									<View key={p.id} style={styles.project}>
										<View style={[styles.projectDot, { backgroundColor: color }]} />
										<Text style={styles.projectName}>{p.project.name}</Text>
										<Text style={[styles.projectMark, { color }]}>{p.final_mark ?? '-'}</Text>
									</View>
								);
							})}
						</View>
					</>
				)}
			</ScrollView>
		</View>
	);
}
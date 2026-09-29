import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { User } from '../types';
import { colors, mono, radius, TOP_INSET } from '../theme';

type Tab = 'skills' | 'projects';

// Cuadro pequeño con un número grande y su etiqueta
function Stat({ label, value }: { label: string; value: string | number })
{
	return (
		<View style={styles.stat}>
			<Text style={styles.statValue}>{value}</Text>
			<Text style={styles.statLabel}>{label}</Text>
		</View>
	);
}

// Línea de detalle: etiqueta a la izquierda, valor a la derecha
function InfoRow({ label, value, last }: { label: string; value: string; last?: boolean })
{
	return (
		<View style={[styles.infoRow, last && styles.infoRowLast]}>
			<Text style={styles.infoLabel}>{label}</Text>
			<Text style={styles.infoValue}>{value}</Text>
		</View>
	);
}

export default function ProfileScreen({ user, onBack }: { user: User; onBack: () => void })
{
	const [tab, setTab] = useState<Tab>('skills');

	const cursus = user.cursus_users.find(c => c.cursus_id === 21)
		?? user.cursus_users[user.cursus_users.length - 1];
	const level = cursus ? cursus.level : 0;
	const levelInt = Math.floor(level);
	const levelDecimals = (level % 1).toFixed(2).slice(2); //"12.01" -> "01"
	const levelPercent = (level % 1) * 100; //la parte decimal es el progreso al siguiente nivel
	const skills = cursus ? [...cursus.skills].sort((a, b) => b.level - a.level) : [];
	const projects = user.projects_users.filter(p => p.status === 'finished');
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
					<Stat label="Wallet" value={user.wallet} />
					<Stat label="Eval points" value={user.correction_point} />
				</View>

				{/* Detalles */}
				<View style={styles.card}>
					<InfoRow label="Email" value={user.email} />
					<InfoRow label="Location" value={user.location ?? 'Unavailable'} last />
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
							const percent = Math.min((s.level / 20) * 100, 100);
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	topBar: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: TOP_INSET,
		paddingBottom: 10,
		paddingHorizontal: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
	backButton: {
		width: 70,
		paddingVertical: 6,
		paddingHorizontal: 8,
	},
	backText: {
		color: colors.accent,
		fontSize: 16,
		fontWeight: '600',
	},
	topTitle: {
		color: colors.text,
		fontSize: 16,
		fontWeight: '700',
	},
	content: {
		width: '100%',
		maxWidth: 600,
		alignSelf: 'center',
		padding: 20,
		paddingBottom: 48,
	},
	hero: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	avatarRing: {
		padding: 3,
		borderRadius: 28,
		borderWidth: 2,
		borderColor: colors.accent,
	},
	avatar: {
		width: 84,
		height: 84,
		borderRadius: 24,
		backgroundColor: colors.surfaceAlt,
	},
	avatarPlaceholder: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatarInitial: {
		fontSize: 34,
		fontFamily: mono,
		color: colors.muted,
	},
	heroInfo: {
		flex: 1,
		marginLeft: 16,
		alignItems: 'flex-start',
	},
	name: {
		fontSize: 22,
		fontWeight: '800',
		color: colors.text,
		letterSpacing: -0.4,
	},
	loginPill: {
		marginTop: 8,
		paddingVertical: 3,
		paddingHorizontal: 10,
		borderRadius: radius.sm,
		backgroundColor: colors.surfaceAlt,
	},
	loginText: {
		fontSize: 13,
		fontFamily: mono,
		color: colors.muted,
	},
	card: {
		backgroundColor: colors.surface,
		borderRadius: radius.lg,
		borderWidth: 1,
		borderColor: colors.border,
		padding: 18,
		marginBottom: 12,
	},
	cardLabel: {
		fontSize: 11,
		letterSpacing: 1.5,
		color: colors.muted,
	},
	levelRow: {
		flexDirection: 'row',
		alignItems: 'baseline',
		marginTop: 6,
		marginBottom: 12,
	},
	levelInt: {
		fontSize: 44,
		fontFamily: mono,
		fontWeight: '700',
		color: colors.text,
	},
	levelDecimals: {
		fontSize: 22,
		fontFamily: mono,
		color: colors.accent,
	},
	levelPercent: {
		flex: 1,
		textAlign: 'right',
		fontSize: 13,
		color: colors.muted,
	},
	barBg: {
		height: 6,
		backgroundColor: colors.surfaceAlt,
		borderRadius: 3,
		overflow: 'hidden',
	},
	barFill: {
		height: 6,
		backgroundColor: colors.accent,
		borderRadius: 3,
	},
	statsRow: {
		flexDirection: 'row',
		gap: 12,
		marginBottom: 12,
	},
	stat: {
		flex: 1,
		backgroundColor: colors.surface,
		borderRadius: radius.lg,
		borderWidth: 1,
		borderColor: colors.border,
		padding: 16,
	},
	statValue: {
		fontSize: 26,
		fontFamily: mono,
		fontWeight: '700',
		color: colors.text,
	},
	statLabel: {
		fontSize: 12,
		color: colors.muted,
		marginTop: 4,
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
	infoRowLast: {
		borderBottomWidth: 0,
	},
	infoLabel: {
		fontSize: 14,
		color: colors.muted,
	},
	infoValue: {
		fontSize: 14,
		fontFamily: mono,
		color: colors.text,
		flexShrink: 1,
		marginLeft: 16,
		textAlign: 'right',
	},
	segment: {
		flexDirection: 'row',
		backgroundColor: colors.surface,
		borderRadius: radius.md,
		borderWidth: 1,
		borderColor: colors.border,
		padding: 4,
		marginTop: 8,
		marginBottom: 12,
	},
	segmentItem: {
		flex: 1,
		paddingVertical: 10,
		borderRadius: radius.sm,
		alignItems: 'center',
	},
	segmentActive: {
		backgroundColor: colors.accentSoft,
	},
	segmentText: {
		fontSize: 14,
		fontWeight: '600',
		color: colors.muted,
	},
	segmentTextActive: {
		color: colors.accent,
	},
	skill: {
		marginBottom: 16,
	},
	skillRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	skillName: {
		fontSize: 15,
		color: colors.text,
		flexShrink: 1,
		marginRight: 12,
	},
	skillValue: {
		fontSize: 13,
		fontFamily: mono,
		color: colors.muted,
	},
	summaryRow: {
		flexDirection: 'row',
		gap: 12,
		marginBottom: 12,
	},
	summary: {
		flex: 1,
		borderRadius: radius.md,
		padding: 14,
	},
	summaryNumber: {
		fontSize: 24,
		fontFamily: mono,
		fontWeight: '700',
	},
	summaryLabel: {
		fontSize: 12,
		color: colors.muted,
		marginTop: 2,
	},
	project: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
	projectDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginRight: 12,
	},
	projectName: {
		flex: 1,
		fontSize: 15,
		color: colors.text,
		marginRight: 12,
	},
	projectMark: {
		fontSize: 14,
		fontFamily: mono,
		fontWeight: '700',
	},
});
import { StyleSheet } from 'react-native';
import { colors, mono, radius, TOP_INSET } from '../theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	topBar: {
		paddingTop: TOP_INSET,
		paddingBottom: 14,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 24,
	},
	content: {
		width: '100%',
		maxWidth: 420,
		alignSelf: 'center',
	},
	brand: {
		fontSize: 17,
		fontWeight: '700',
		color: colors.text,
		letterSpacing: -0.2,
	},
	logo: {
		alignSelf: 'center',
		marginBottom: 32,
		tintColor: '#FFFFFF',
	},
	title: {
		fontSize: 30,
		fontWeight: '800',
		color: colors.text,
		letterSpacing: -0.6,
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 14,
		lineHeight: 21,
		color: colors.muted,
		marginTop: 6,
		marginBottom: 28,
		textAlign: 'center',
	},
	inputBox: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 56,
		paddingHorizontal: 16,
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: radius.md,
	},
	inputBoxFocused: {
		borderColor: colors.accent,
	},
	prefix: {
		fontSize: 18,
		fontFamily: mono,
		color: colors.accent,
		marginRight: 8,
	},
	input: {
		flex: 1,
		fontSize: 17,
		fontFamily: mono,
		color: colors.text,
	},
	errorBox: {
		backgroundColor: colors.dangerSoft,
		borderRadius: radius.sm,
		paddingVertical: 10,
		paddingHorizontal: 14,
		marginTop: 12,
	},
	errorText: {
		color: colors.danger,
		fontSize: 14,
	},
	button: {
		height: 56,
		backgroundColor: colors.accent,
		borderRadius: radius.md,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 16,
	},
	buttonText: {
		color: colors.background,
		fontSize: 16,
		fontWeight: '700',
	},
	loadingBox: {
		alignItems: 'center',
	},
	dotsRow: {
		flexDirection: 'row',
		gap: 10,
		marginBottom: 24,
	},
	dot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: colors.accent,
	},
	loadingTitle: {
		fontSize: 17,
		fontFamily: mono,
		color: colors.text,
	},
	loadingSub: {
		fontSize: 13,
		color: colors.muted,
		marginTop: 6,
	},
	footer: {
		textAlign: 'center',
		fontSize: 12,
		color: colors.muted,
		paddingBottom: 28,
	},
});
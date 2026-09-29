import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getAccessToken } from '../services/oauth';
import { getUser } from '../services/api';
import { User } from '../types';
import { colors, mono, radius, TOP_INSET } from '../theme';

const logo = require('../../assets/logo-42madrid.png');
// Calculamos el ancho a partir de la proporción real del logo para que quede pegado a la izquierda
const LOGO_HEIGHT = 110;
const { width: logoW, height: logoH } = Image.resolveAssetSource(logo);
const LOGO_WIDTH = (LOGO_HEIGHT * logoW) / logoH;

// Tres puntos que se encienden uno tras otro mientras se carga
function ThinkingDots()
{
	const dots = useRef([0, 1, 2].map(() => new Animated.Value(0.3))).current;

	useEffect(() =>
	{
		// Cada punto sube y baja; el retraso inicial los desfasa entre sí
		const loops = dots.map((dot, i) => Animated.loop(
			Animated.sequence([
				Animated.delay(i * 160),
				Animated.timing(dot, { toValue: 1, duration: 400, useNativeDriver: true }),
				Animated.timing(dot, { toValue: 0.3, duration: 400, useNativeDriver: true }),
				Animated.delay((2 - i) * 160),
			])
		));
		loops.forEach(l => l.start());
		return () => loops.forEach(l => l.stop());
	}, [dots]);

	return (
		<View style={styles.dotsRow}>
			{dots.map((dot, i) => (
				<Animated.View
					key={i}
					style={[
						styles.dot,
						{
							opacity: dot,
							transform: [{ scale: dot.interpolate({ inputRange: [0.3, 1], outputRange: [0.8, 1.25] }) }],
						},
					]}
				/>
			))}
		</View>
	);
}

export default function SearchScreen({ onFound }: { onFound: (user: User) => void })
{
	const [login, setLogin] = useState('');
	const [error, setError] = useState(''); //guardamos el mensaje de error
	const [loading, setLoading] = useState(false);
	const [focused, setFocused] = useState(false); //para resaltar el borde del input al escribir

	const handleSearch = async () =>
	{
		if (login.trim() === '')
		{
			setError('Please enter a login.');
			return;
		}
		Keyboard.dismiss();
		setError('');//cuando el usuario sea valido limpiamos el error
		setLoading(true);
		try
		{
			const token = await getAccessToken();
			const user = await getUser(login.trim(), token);
			onFound(user);
		}
		catch (error)
		{
			if (error instanceof Error && error.message === 'USER_NOT_FOUND')
				setError('User not found.');
			else if (error instanceof TypeError)
				setError('Network error. Check your connection.');
			else
				setError('Something went wrong. Try again.');
			console.error(error);
		}
		finally
		{
			setLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<StatusBar style="light" />

			<View style={styles.topBar}>
				<Text style={styles.brand}>Swifty Companion</Text>
			</View>

			<View style={styles.center}>
				<View style={styles.content}>
				{loading ? (
					<View style={styles.loadingBox}>
						<ThinkingDots />
						<Text style={styles.loadingTitle}>
						Searching @{login.trim()}
						</Text>
						<Text style={styles.loadingSub}>
						Fetching the profile from the intra…
						</Text>
					</View>
				) : (
					<>
						<Image
						source={logo}
						style={[
							styles.logo,
							{
								width: LOGO_WIDTH,
								height: LOGO_HEIGHT,
							},
						]}
						/>

						<Text style={styles.title}>
						Search a student
						</Text>

						<Text style={styles.subtitle}>
						Enter a 42 login to see their level, skills and projects.
						</Text>

						<View
						style={[
							styles.inputBox,
							focused && styles.inputBoxFocused,
						]}
						>
						<Text style={styles.prefix}>@</Text>

						<TextInput
							style={styles.input}
							placeholder="login"
							placeholderTextColor={colors.muted}
							value={login}
							onChangeText={setLogin}
							onFocus={() => setFocused(true)}
							onBlur={() => setFocused(false)}
							onSubmitEditing={handleSearch}
							autoCapitalize="none"
							autoCorrect={false}
							returnKeyType="search"
						/>
						</View>

						{error !== '' && (
						<View style={styles.errorBox}>
							<Text style={styles.errorText}>{error}</Text>
						</View>
						)}

						<TouchableOpacity
						style={styles.button}
						onPress={handleSearch}
						activeOpacity={0.85}
						>
						<Text style={styles.buttonText}>
							Search →
						</Text>
						</TouchableOpacity>
					</>
				)}
				</View>
			</View>
		</KeyboardAvoidingView>
		);
}

const styles = StyleSheet.create({
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
		alignSelf: 'center', //centra el logo horizontalmente
		marginBottom: 32,
		tintColor: '#FFFFFF', //lo pinta de blanco
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
import React from 'react';

interface ErrorBoundaryProps {
	children: React.ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

const styles = {
	errorContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100vh',
		backgroundColor: '#f8d7da',
		color: '#721c24',
		padding: '20px',
		fontFamily: 'Arial, sans-serif',
		textAlign: 'center',
	},
	title: {
		fontSize: '24px',
		marginBottom: '10px',
	},
	message: {
		fontSize: '16px',
		marginBottom: '20px',
	},
	button: {
		padding: '10px 20px',
		fontSize: '16px',
		color: '#fff',
		backgroundColor: '#dc3545',
		border: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
	},
} as const;

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError) {

			return (
				<div style={styles.errorContainer}>
					<h1 style={styles.title}>Упс! Что-то пошло не так. 🛠️</h1>
					<p style={styles.message}>{this.state.error?.message || 'Произошла ошибка.'}</p>
					<button style={styles.button} onClick={this.handleReset}>
						Попробовать снова
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;

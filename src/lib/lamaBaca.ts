export const lamaBaca = (text: string, wordsPerMinute = 50) => {
	// Memecah teks menjadi array kata-kata
	const words = text.split(' ');

	// Mengambil 20 kata pertama dari teks
	const first20Words = words.slice(0, 20);

	// Menghitung waktu membaca dalam menit dan detik
	const timeInSeconds = (first20Words.length * 60) / wordsPerMinute;

	// Mengonversi waktu menjadi waktu yang mudah dipahami
	const hours = Math.floor(timeInSeconds / 3600);
	const minutes = Math.floor((timeInSeconds % 3600) / 60);
	const seconds = Math.round(timeInSeconds % 60);
	const finishAt = new Date();
	finishAt.setHours(finishAt.getHours() + hours);
	finishAt.setMinutes(finishAt.getMinutes() + minutes);
	finishAt.setSeconds(finishAt.getSeconds() + seconds);
	return { hours, minutes, seconds, timeInSeconds, finishAt };
};

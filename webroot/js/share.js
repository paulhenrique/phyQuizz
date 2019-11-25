$("#btn_share").on('click', function () {
    if (navigator.share !== undefined) {
        navigator.share({
            title: 'phyQuizz',
            text: 'Um app de perguntas e respostas sobre física e matemática para passar nos vestibulares mais concorridos!',
            url: 'https://paulhenrique.github.io/phyQuizz/',
        })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
    }
});
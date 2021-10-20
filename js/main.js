;
Array.prototype.shuffle = function () {
    for (var i = this.length - 1; i > 0; i--) {
        var num = Math.floor(Math.random() * (i + 1));
        var d = this[num];
        this[num] = this[i];
        this[i] = d;
    }
    return this;
};

window.addEventListener('load', function (e) {
    // setTask(mainIdx, currentLevel);
    tasks.shuffle();
    initHandlers();
    levelSelection();
});

var mainIdx = 0;

var currentLevel = '0';
var storeLevel = '';

var currentTaskLevelOne = {
    mainWord: '',
    subWords: [],
    level: false
};

var currentTaskLevelTwo = {
    mainWord: '',
    subWords: [],
    level: false
};

var currentTaskLevelThree = {
    mainWord: '',
    subWords: [],
    level: false,
    trans: ''
};

var resultTask = {
    mainWord: '',
    subWords: []
};

var currentUser = '';

var RESULTS = [
        '<span class="result">ЗАДАНИЕ НЕ РЕШЕНО!</span>',
        '<span class="result correct">ЗАДАНИЕ РЕШЕНО ВЕРНО!</span>',
        '<span class="result incorrect">ЗАДАНИЕ РЕШЕНО НЕ ВЕРНО!</span>'
    ],

    tasks = [
        {
            levels: ['1', '2', '3'],
            mainWord: 'bring',
            subWords: [
                {
                    word: 'about',
                    translation: ['осуществлять']
                },
                {
                    word: 'back',
                    translation: ['напоминать', 'вспоминать']
                },
                {
                    word: 'in',
                    translation: ['приносить', 'вносить']
                },
                {
                    word: 'out',
                    translation: ['выпускать на продажу']
                },
                {
                    word: 'round',
                    translation: ['приводить в сознание']
                },
                {
                    word: 'up',
                    translation: ['растить', 'воспитывать']
                }
            ]
        },
        {
            levels: ['1', '2', '3'],
            mainWord: 'call',
            subWords: [
                {
                    word: 'for',
                    translation: ['звать']
                },
                {
                    word: 'in',
                    translation: ['заходить', 'наносить визит']
                },
                {
                    word: 'off',
                    translation: ['отменять']
                },
                {
                    word: 'on',
                    translation: ['навещать']
                },
                {
                    word: 'out',
                    translation: ['просить о помощи']
                }
            ]
        },
        {
            levels: ['1', '2', '3'],
            mainWord: 'get',
            subWords: [
                {
                    word: 'across',
                    translation: ['доносить идеи до слушателя']
                },
                {
                    word: 'along with',
                    translation: ['общаться', 'поддерживать отношения']
                },
                {
                    word: 'somebody down',
                    translation: ['расстраивать']
                },
                {
                    word: 'over',
                    translation: ['поправиться', 'выздороветь']
                },
                {
                    word: 'over with',
                    translation: ['закончить', 'справиться']
                }
            ]
        },
        {
            levels: ['1', '2', '3'],
            mainWord: 'give',
            subWords: [
                {
                    word: 'away',
                    translation: ['открыть секрет', 'отдавать']
                },
                {
                    word: 'back',
                    translation: ['возвращать']
                },
                {
                    word: 'out',
                    translation: ['раздавать']
                },
                {
                    word: 'up',
                    translation: ['cдаваться']
                }
            ]
        },
        {
            levels: ['1', '2', '3'],
            mainWord: 'go',
            subWords: [
                {
                    word: 'after',
                    translation: ['преследовать']
                },
                {
                    word: 'down with',
                    translation: ['cвалиться с', 'заболеть']
                },
                {
                    word: 'off',
                    translation: ['выйти из строя', 'сломаться']
                },
                {
                    word: 'through',
                    translation: ['получить опыт']
                },
                {
                    word: 'up',
                    translation: ['повышать', 'увеличивать']
                },
                {
                    word: 'with',
                    translation: ['идти', 'подходить'],
                    comment: 'об одежде'
                },
                {
                    word: 'without',
                    translation: ['выживать', 'справляться']
                }
            ]
        },
        {
            levels: ['1', '2', '3'],
            mainWord: 'put',
            subWords: [
                {
                    word: 'away',
                    translation: ['откладывать', 'убирать']
                },
                {
                    word: 'off',
                    translation: ['отсрочивать', 'откладывать']
                },
                {
                    word: 'on',
                    translation: ['одевать']
                },
                {
                    word: 'out',
                    translation: ['потушить'],
                    comment: 'огонь'
                },
                {
                    word: 'through',
                    translation: ['соединить']
                },
                {
                    word: 'up with',
                    translation: ['мириться'],
                    comment: 'с чем-либо'
                }
            ]
        },
        {
            levels: ['1', '2', '3'],
            mainWord: 'set',
            subWords: [
                {
                    word: 'aside',
                    translation: ['отставлять', 'откладывать']
                },
                {
                    word: 'back',
                    translation: ['задерживать']
                },
                {
                    word: 'in',
                    translation: ['устанавливать']
                },
                {
                    word: 'off',
                    translation: ['отправляться']
                }
            ]
        },
        {
            levels: ['1', '2', '3'],
            mainWord: 'take',
            subWords: [
                {
                    word: 'after',
                    translation: ['быть похожим на']
                },
                {
                    word: 'off',
                    translation: ['взлетать на самолете', 'убирать']
                },
                {
                    word: 'to',
                    translation: ['понравиться', 'пристраститься']
                },
                {
                    word: 'up',
                    translation: ['увлечься', 'занять время']
                }
            ]
        },
        {
            levels: ['2', '3'],
            mainWord: '',
            subWords: [
                {
                    word: 'absent from',
                    translation: ['отсутствующий с']
                },
                {
                    word: 'at the age of',
                    translation: ['в возрасте']
                },
                {
                    word: 'at the beginning of',
                    translation: ['в начале']
                },
                {
                    word: 'at the end of',
                    translation: ['в конце']
                },
                {
                    word: 'blame someone for',
                    translation: ['ругать кого-то за что-то']
                }
            ]
        },
        {
            levels: ['2', '3'],
            mainWord: '',
            subWords: [
                {
                    word: 'by cheque',
                    translation: ['по чеку']
                },
                {
                    word: 'by credit card',
                    translation: ['по кредитной карте']
                },
                {
                    word: 'by nature',
                    translation: ['по природе']
                },
                {
                    word: 'care about',
                    translation: ['заботиться о']
                },
                {
                    word: 'career in',
                    translation: ['карьера в']
                }
            ]
        },
        {
            levels: ['2', '3'],
            mainWord: '',
            subWords: [
                {
                    word: 'close to',
                    translation: ['близкий к']
                },
                {
                    word: 'come from',
                    translation: ['происходить', 'быть родом']
                },
                {
                    word: 'fond of',
                    translation: ['увлекаться']
                },
                {
                    word: 'for hire',
                    translation: ['напрокат']
                },
                {
                    word: 'good at',
                    translation: ['способный к']
                }
            ]
        },
        {
            levels: ['2', '3'],
            mainWord: '',
            subWords: [
                {
                    word: 'in advance',
                    translation: ['раньше времени', 'заранее']
                },
                {
                    word: 'in cash',
                    translation: ['наличными']
                },
                {
                    word: 'in charge of',
                    translation: ['ответственный за']
                },
                {
                    word: 'in favour of',
                    translation: ['в честь']
                }
            ]
        },
        {
            levels: ['2', '3'],
            mainWord: '',
            subWords: [
                {
                    word: 'in flames',
                    translation: ['в огне']
                },
                {
                    word: 'in good condition',
                    translation: ['в хорошем состоянии']
                },
                {
                    word: 'in great demand',
                    translation: ['очень востребованный']
                },
                {
                    word: 'jealous of',
                    translation: ['ревнивый']
                },
                {
                    word: 'keen on',
                    translation: ['страстно увлеченный']
                },
                {
                    word: 'nervous about',
                    translation: ['волнующийся о']
                },
                {
                    word: 'off season',
                    translation: ['вне сезона']
                }
            ]
        },
        {
            levels: ['2', '3'],
            mainWord: '',
            subWords: [
                {
                    word: 'on board',
                    translation: ['на борту']
                },
                {
                    word: 'on earth',
                    translation: ['на Земле']
                },
                {
                    word: 'at the seaside',
                    translation: ['на берегу']
                },
                {
                    word: 'out of danger',
                    translation: ['вне опасности']
                },
                {
                    word: 'out of stock',
                    translation: ['нет в продаже/в наличии']
                },
                {
                    word: 'patient with',
                    translation: ['терпеливый к']
                }
            ]
        },
        {
            levels: ['2', '3'],
            mainWord: '',
            subWords: [
                {
                    word: 'popular with',
                    translation: ['популярный']
                },
                {
                    word: 'proud of',
                    translation: ['гордый', 'гордиться']
                },
                {
                    word: 'under pressure',
                    translation: ['в стрессовой ситуации']
                },
                {
                    word: 'without delay',
                    translation: ['безотлагательно']
                }
            ]
        },
        {
            levels: ['2', '3'],
            mainWord: '',
            subWords: [
                {
                    word: 'worry about',
                    translation: ['беспокоиться о']
                }
            ]
        }
    ];

var selectedTasks = [];

var level1 = new Vue({
    el: '#level1',
    data: currentTaskLevelOne,
    computed: {
        isLevelOne: function () {
            return this.level
        }
    },
    watch: {
        level: function () {
            if (currentLevel === '1') this.level = true
        }
    }
});

var level2 = new Vue({
    el: '#level2',
    data: currentTaskLevelTwo,
    computed: {
        isLevelTwo: function () {
            return this.level
        }
    },
    watch: {
        level: function () {
            if (currentLevel === '2') this.level = true
        }
    }
});

var level3 = new Vue({
    el: '#level3',
    data: currentTaskLevelThree,
    computed: {
        isLevelThree: function () {
            return this.level
        }
    },
    watch: {
        level: function () {
            if (currentLevel === '3') this.level = true
        }
    }
});

var resultViewer = new Vue({
    el: '#resViewer',
    data: resultTask,
    computed: {},
    watch: {}
});

var taskHeader = new Vue({
    el: '#task_header',
    props: ['mainIdx'],
    data: {
        idx: 0,
        count: 0,
        hidden: false
    },
    computed: {
        start: function () {
            return mainIdx;
        },
        end: function () {
            return selectedTasks.length;
        },
        isHidden: function () {
            return !this.hidden
        }
    },
    methods: {
        print: function () {
            this.idx = mainIdx + 1;
            this.count = selectedTasks.length;
        },
        hide: function () {
            this.hidden = true
        }
    }
});

var username = new Vue({
    el: '#username_label',
    props: ['mainIdx'],
    data: {
        username: ''
    },
    methods: {
        print: function () {
            this.username = currentUser;
        }
    }
});

var results = {
    '1': [],
    '2': [],
    '3': []
};

function initHandlers() {
    $('.next').off('click').on('click', function () {
        if (!$(this).hasClass('my-hide')) {
            var showMustGoOn = true;
            while (showMustGoOn) {
                mainIdx++;
                if (!selectedTasks[mainIdx]) {
                    mainIdx--;
                    showMustGoOn = false;
                }
                else {
                    if (selectedTasks[mainIdx].levels.indexOf(currentLevel) !== -1) {
                        setTask(mainIdx, currentLevel);
                        showMustGoOn = false;
                    }
                }
            }
            var trays = 3 - results[currentLevel][mainIdx].try;
            $('#check_label').text('Осталось попыток: ' + trays);
            $(this).addClass('my-hide');
            $('.check').removeClass('my-hide');
            $('.result-label').html(RESULTS[0]);
        }
    });

    $('.check').off('click').on('click', function () {
        if (results[currentLevel][mainIdx].try < 3 || !$(this).hasClass('my-hide')) {
            storeResult(mainIdx, currentLevel);
            checkResult(mainIdx, currentLevel);
            var trays = 3 - results[currentLevel][mainIdx].try;
            $('#check_label').text('Осталось попыток: ' + trays);
            if (results[currentLevel][mainIdx].try >= 3) {
                $('.next').removeClass('my-hide');
                $(this).addClass('my-hide');
            }
            if (results[currentLevel][mainIdx].isCorrect) {
                $('.result-label').html(RESULTS[1]);
                $('.next').removeClass('my-hide');
                $(this).addClass('my-hide');
            } else {
                $('.result-label').html(RESULTS[2]);
            }
        }
        if ((results[currentLevel][mainIdx].try >= 3 || results[currentLevel][mainIdx].isCorrect) && mainIdx >= selectedTasks.length - 1) {
            $('#results_show').removeClass('hide');
            $(this).addClass('hide');
            $('.next').addClass('hide');
            $('.prev').addClass('hide');
        }
    });
    $('#results_show').off('click').on('click', function () {
        $('#check_label').addClass('hide');
        $('.result-label').addClass('hide');
        taskHeader.hide();
        storeLevel = currentLevel;
        hideLevels(currentLevel);
        setResultsTable(storeLevel);
        $(this).addClass('hide');
        $('#save_to_file').removeClass('hide');
    });
    $('#save_to_file').off('click').on('click', function () {
        saveToXLSX(storeLevel);
    });
}

function levelSelection() {
    var viewer = document.getElementById('myViewer');
    viewer.style.display = "block";

    $('.difficulty-button').off('click').on('click', function () {
        currentUser = $('#username').val();
        if (currentUser !== '') {
            viewer.style.display = "none";
            currentLevel = $(this).attr('id').split('_').splice(1).join('');
            initTasks(currentLevel);
            initResults();
            setTask(mainIdx, currentLevel);
            username.print();
            $('.result-label').html(RESULTS[0]);
            var trays = 3 - results[currentLevel][mainIdx].try;
            $('#check_label').text('Осталось попыток: ' + trays);
        }
    });

}

function initTasks(level) {
    selectedTasks = [];

    tasks.forEach(function (item) {
        item.subWords.shuffle();
        if (item.levels.indexOf(level) !== -1) {
            selectedTasks.push(item);
        }
    });
}

function initResults() {
    for (var key in results) {
        results[key] = [];
    }
    selectedTasks.forEach(function (item) {
        if (item.levels.indexOf(currentLevel) !== -1) {
            results[currentLevel].push({
                try: 0,
                mainWord: item.mainWord,
                subWords: [],
                isCorrect: false
            });
            item.subWords.forEach(function (item) {
                results[currentLevel][results[currentLevel].length - 1].subWords.push({
                    word: '',
                    translation: item.translation,
                    correctWord: item.word,
                    trans: ''
                })
            });
        }
    });
}

function hideLevels(level) {
    switch (level) {
        case '1':
            currentLevel = '0';
            currentTaskLevelOne.level = false;
            break;
        case '2':
            currentLevel = '0';
            currentTaskLevelTwo.level = false;
            break;
        case '3':
            currentLevel = '0';
            currentTaskLevelThree.level = false;
            break;
    }
}

function storeResult(idx, level) {
    switch (level) {
        case '1':
            currentTaskLevelOne.subWords.forEach(function (item, i) {
                results[level][idx].subWords[i].word = item.word;
            });
            break;
        case '2':
            currentTaskLevelTwo.subWords.forEach(function (item, i) {
                results[level][idx].subWords[i].word = item.word;
            });
            break;
        case '3':
            currentTaskLevelThree.subWords.forEach(function (item, i) {
                results[level][idx].subWords[i].trans = item.trans;
            });
            break;
    }
}

function checkResult(idx, level) {
    results[level][idx].try++;
    var result = true;
    console.log(results[level][idx]);
    var mainWord = results[level][idx].mainWord.toLocaleLowerCase();
    results[level][idx].subWords.forEach(function (subitem) {
        switch (level) {
            case '1':
                if (subitem.word !== '') {
                    if (subitem.word.toLocaleLowerCase() !== subitem.correctWord) result = false
                } else {
                    result = false
                }
                break;
            case '2':
                if (subitem.word !== '') {
                    if (mainWord !== '') {
                        if (subitem.word.toLocaleLowerCase() !== (mainWord + ' ' + subitem.correctWord)) result = false
                    } else {
                        if (subitem.word.toLocaleLowerCase() !== subitem.correctWord) result = false
                    }

                } else {
                    result = false
                }
                break;
            case '3':
                if (subitem.trans !== '') {
                    console.log(subitem);
                    if (subitem.translation.indexOf(subitem.trans.toLocaleLowerCase()) === -1) result = false
                } else {
                    result = false
                }
                break;
        }
    });
    results[level][idx].isCorrect = result
}

function setTask(idx, level) {
    switch (level) {
        case '1':
            setTaskLevelOne(idx);
            break;
        case '2':
            setTaskLevelTwo(idx);
            break;
        case '3':
            setTaskLevelThree(idx);
            break;
    }
    taskHeader.print();
}

function setTaskLevelOne(idx) {
    if (tasks[idx]) {

        currentTaskLevelOne.mainWord = selectedTasks[idx].mainWord;
        currentTaskLevelOne.level = true;
        currentTaskLevelOne.subWords = [];

        selectedTasks[idx].subWords.forEach(function (item) {
            currentTaskLevelOne.subWords.push({
                word: '',
                translation: item.translation
            })
        });
    }
}

function setTaskLevelTwo(idx) {
    if (tasks[idx]) {

        currentTaskLevelTwo.mainWord = selectedTasks[idx].mainWord;
        currentTaskLevelTwo.level = true;
        currentTaskLevelTwo.subWords = [];

        selectedTasks[idx].subWords.forEach(function (item) {
            currentTaskLevelTwo.subWords.push({
                word: '',
                translation: item.translation
            })
        });
    }
}

function setTaskLevelThree(idx) {
    if (tasks[idx]) {

        currentTaskLevelThree.mainWord = selectedTasks[idx].mainWord;
        currentTaskLevelThree.level = true;
        currentTaskLevelThree.subWords = [];

        selectedTasks[idx].subWords.forEach(function (item) {
            currentTaskLevelThree.subWords.push({
                word: item.word,
                trans: ''
            })
        });
    }
}

function setResultsTable(level) {
    var $table = $('.results-container');
    $table.empty();
    $table.append('<div class="row"><div class="col b-right"><b>Задание</b></div><div class="col b-right"><b>Решено</b></div><div class="col b-right"><b>Попыток</b></div><div class="col"><b>Ваш ответ</b></div></div>');
    results[level].forEach(function (item, i) {
        var answer = item.isCorrect ? 'Да' : 'Нет';
        var tableItem = '<div class="row">' +
            '<div class="col b-top b-right">' + (i + 1) + '</div>' +
            '<div class="col b-top b-right">' + answer + '</div>' +
            '<div class="col b-top b-right">' + item.try + '</div>' +
            '<div class="col b-top"><button id="myAns_' + i + '" class="my-button small my-answer">Показать</button></div>' +
            /* '<div class="col b-top"><button id="corAns_' + i + '" class="my-button small correct-answer">Показать</button></div>' + */
            '</div>';
        $table.append(tableItem);
        var rowColor = item.isCorrect ? 'correct' : 'incorrect';
        console.log(i, rowColor);
        $table.find('.row').last().addClass(rowColor);
        $('.my-answer').last().off('click').on('click', function () {
            showResults($(this).attr('id').split('_').splice(1).join(''), true, level);
        });
       /* $('.correct-answer').last().off('click').on('click', function () {
            showResults($(this).attr('id').split('_').splice(1).join(''), false, level);
        });*/
    });
}

function showResults(idx, isMyResults, level) {

    var viewer = document.getElementById('my-results-viewer');
    var rViewer = document.getElementById('resViewer');
    viewer.style.display = "block";
    var close = document.getElementById('my-results-viewer-close');

    close.onclick = function () {
        viewer.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === rViewer) {
            viewer.style.display = "none";
        }
    };

    switch (level) {
        case '1':
            resultTask.mainWord = results[level][idx].mainWord;
            resultTask.subWords = [];
            results[level][idx].subWords.forEach(function (item) {
                if (isMyResults) {
                    resultTask.subWords.push({
                        word: item.word !== '' ? item.word : 'Нет ответа',
                        correctWord: item.correctWord,
                        translation: item.translation.join('/')
                    });
                } else {
                    resultTask.subWords.push({
                        word: item.correctWord,
                        translation: item.translation.join('/')
                    });
                }
            });
            console.log(results[level][idx], isMyResults);
            break;
        case '2':
            resultTask.mainWord = '';
            resultTask.subWords = [];
            results[level][idx].subWords.forEach(function (item) {
                if (isMyResults) {
                    resultTask.subWords.push({
                        word: item.word !== '' ? item.word : 'Нет ответа',
                        correctWord: item.correctWord,
                        translation: item.translation.join('/')
                    });
                } else {
                    var str = results[level][idx].mainWord !== '' ? results[level][idx].mainWord + ' ' + item.correctWord : item.correctWord;
                    resultTask.subWords.push({
                        word: str,
                        translation: item.translation.join('/')
                    });
                }
            });
            console.log(results[level][idx], isMyResults);
            break;
        case '3':
            resultTask.mainWord = '';
            resultTask.subWords = [];
            results[level][idx].subWords.forEach(function (item) {
                var str = results[level][idx].mainWord !== '' ? results[level][idx].mainWord + ' ' + item.correctWord : item.correctWord;
                if (isMyResults) {
                    resultTask.subWords.push({
                        word: item.trans !== '' ? item.trans : 'Нет ответа',
                        correctWord: item.translation.join('/'),
                        translation: str
                    });
                } else {
                    resultTask.subWords.push({
                        word: item.translation.join('/'),
                        translation: str
                    });
                }
            });
            console.log(results[level][idx], isMyResults);
            break;
    }
}

function saveToXLSX(level) {
    var output = [
        [currentUser],
        ['Задание', 'Решено', 'Попыток']
    ];

    var taskSheets = [];

    results[level].forEach(function (item, i) {
        var el = [];
        el.push(i + 1);
        var str = item.isCorrect ? 'Да' : 'Нет';
        el.push(str);
        el.push(item.try);
        output.push(el);
        var aoa = [
            ['', 'Решение', 'Ответ']
        ];
        item.subWords.forEach(function (subWord, j) {

            var task = [];
            var answer = '';
            switch (level) {
                case '1':
                    task.push(item.mainWord);
                    answer = subWord.word !== '' ? subWord.word : 'Нет ответа';
                    if(subWord.word !== '' && subWord.word !== subWord.correctWord) {
                        answer = answer.toLocaleUpperCase();
                    }
                    task.push(answer);
                    task.push(subWord.correctWord);
                    task.push(subWord.translation.join('/'));
                    break;
                case '2':
                    task.push('');
                    answer = subWord.word !== '' ? subWord.word : 'Нет ответа';
                    if(subWord.word !== '' && subWord.word !== subWord.correctWord) {
                        answer = answer.toLocaleUpperCase();
                    }
                    task.push(answer);
                    answer = item.mainWord !== '' ? item.mainWord + ' ' + subWord.correctWord : subWord.correctWord;
                    task.push(answer);
                    task.push(subWord.translation.join('/'));
                    break;
                case '3':
                    task.push('');
                    answer = subWord.trans !== '' ? subWord.trans : 'Нет ответа';
                    if(subWord.trans !== '' && subWord.translation.indexOf(subWord.trans.toLocaleLowerCase()) === -1) {
                        answer = answer.toLocaleUpperCase();
                    }
                    task.push(answer);
                    task.push(subWord.translation.join('/'));
                    answer = item.mainWord !== '' ? item.mainWord + ' ' + subWord.correctWord : subWord.correctWord;
                    task.push(answer);
                    break;
            }
            aoa.push(task);
        });
        var taskWs = XLSX.utils.aoa_to_sheet(aoa);
        taskSheets.push(taskWs);
    });
    var ws = XLSX.utils.aoa_to_sheet(output);
    var wb =  XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, currentUser);
    taskSheets.forEach(function (value, i) {
        var name = '' + (i + 1);
        XLSX.utils.book_append_sheet(wb, value, name);
    });
    var filename = currentUser + '.xlsx';
    XLSX.writeFile(wb, filename);
}

require('colors');
const { v4: uuidv4 } = require('uuid');

class Task {
    id = '';
    desc = '';
    completedOn =  null;

    constructor( desc ) {
        this.desc = desc;
        this.id = uuidv4();
    }
}

class Tasks {
    _list = {};

    get arrayList() {
        const list = [];

        Object.keys(this._list).forEach( key => {
            list.push(this._list[key]);
        });

        return list;
    }

    ListAll() {
        console.log();

        this.arrayList.forEach((task, i) => {
            let idx = '';
            let sCompletedOn = '';

            idx = `${i + 1}`.green;

            sCompletedOn = (task.completedOn) ? `Completed`.green : 'Pending'.red;

            console.log(`${ idx }.- ${ task.desc } :: ${ sCompletedOn }`);
        });
    }

    ListCompleted() {
        console.log();

        let i = 1;

        this.arrayList.forEach((task) => {
            if (task.completedOn) {        
                console.log(`${i}.- ${ task.desc } :: ${ task.completedOn }`.green);
                ++i;
            }
        });
    }

    ListPending() {
        console.log();

        this.arrayList.forEach((task, i) => {
            if (!task.completedOn)
                console.log(`${ i + 1 }.- ${ task.desc }`.red);
        });
    }

    loadTasksFromArray(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task;
        });
    }

    deleteTask(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    constructor() {
        this._list = {};    
    }

    createTask(desc = '') {
        const task = new Task(desc);

        this._list[task.id] = task;
    }

    toggleCompleted(ids = []) {
        ids.forEach(id => {
            const task = this._list[id];

            if (!task.completedOn) {
                task.completedOn = new Date().toISOString();
            }
        });

        this.arrayList.forEach(task => {
            if (!ids.includes(task.id)) {
                this._list[task.id].completedOn = null;
            }
        });
    }
}

module.exports = Tasks;
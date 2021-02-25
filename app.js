const { listTaskForComplete, inquirerMenu, pause, readInput, listTaskForDelete, confirm } = require('./helpers/inquirer');
const { saveJsonFile, readJsonFile } = require('./helpers/dbFile');
const Tasks = require('./models/tasks');

console.clear();

const main = async() => {
    const tasks = new Tasks();

    let opt = '';

    const tasksDB = readJsonFile();

    if (tasksDB) {
        tasks.loadTasksFromArray(tasksDB);
    }

    do {
        // This function print the system menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await readInput('Description: ');
                tasks.createTask(desc);
            break;
            case '2':
                tasks.ListAll();
            break;
            case '3':
                tasks.ListCompleted();
            break;
            case '4':
                tasks.ListPending();
            break;
            case '5':
                const ids = await listTaskForComplete(tasks.arrayList);
                tasks.toggleCompleted(ids);
                
                console.log({ ids });
                /*if (ids !== '0') {
                    const isConfirmed = await confirm('Are you sure delete this task?');
                
                    if (isConfirmed) {
                        tasks.deleteTask(ids);
                        console.log('Task deleted successfully');
                    }
                }
                */
            break;
            case '6':
                const id = await listTaskForDelete(tasks.arrayList);
                
                if (id !== '0') {
                    const isConfirmed = await confirm('Are you sure delete this task?');
                
                    if (isConfirmed) {
                        tasks.deleteTask(id);
                        console.log('Task deleted successfully');
                    }
                }
            break;
        }

        saveJsonFile(tasks.arrayList);

        await pause();
    } while ( opt !== '0');
}

main();
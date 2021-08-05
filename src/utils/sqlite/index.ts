import {ITodo, INewTodo, ITodoService} from '~/entities/Todo'
import Database, { Statement } from 'better-sqlite3'

class TodoService implements ITodoService {

    private db: any
    private dbUrl: string = process.env.DATABASE_URL || 'db/circle.db'
    private selectListStmt: Statement
    private createStmt: Statement
    
    open = () => {
        this.db = new Database(this.dbUrl)

        this.selectListStmt = this.db.prepare('select * from t_todo')
        this.createStmt = this.db.prepare(`insert into t_todo('c_content') values(:content)`)
        
    }

    close = () => {
        this.db.close()
    }

    selectList = () => this.selectListStmt.all()
    
    create = (todo: INewTodo) => this.createStmt.run(todo.content).changes === 1;
    
}

export const todoService = new TodoService()
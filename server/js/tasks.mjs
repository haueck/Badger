import Firestore from "@google-cloud/firestore"

export default class {
  constructor(options) {
    this.db = options.db
    this.user = options.user
  }

  get(query, success, failure) {
    query.get().then(projects => {
      let promises = []
      projects.forEach(doc => {
        let project = doc.data()
        project["ProjectId"] = doc.id
        project["Tasks"] = []
        promises.push(doc.ref.collection("Tasks").get().then(tasks => {
          tasks.forEach(doc => {
            let task = doc.data()
            task["TaskId"] = doc.id
            project["Tasks"].push(task)
          })
          return project
        }))
      })
      return Promise.all(promises)
    }).then(data => {
      success("Tasks", { Data: data })
    }).catch(error => {
      failure("Failed to get taks", { error })
    })
  }

  getActive(success, failure) {
    this.get(this.user.collection("Projects").where("Status", "==", "Active"), success, failure)
  }

  getInactive(success, failure) {
    this.get(this.user.collection("Projects").where("Status", "in", [ "Future", "Finished" ]), success, failure)
  }

  createProject(name, priority, color, status, success, failure) {
    this.user.collection("Projects").add({
      Name: name,
      Color: color,
      Status: status,
      Priority: priority
    }).then(doc => {
      success("ProjectCreated", { ProjectId: doc.id })
    }).catch(error => {
      failure("Failed to create a project", { error })
    })
  }

  createTask(name, project, description, status, success, failure) {
    this.user.collection("Projects").doc(project).collection("Tasks").add({
      Name: name,
      Status: status,
      Description: description
    }).then(doc => {
      success("TaskCreated", { TaskId: doc.id })
    }).catch(error => {
      failure("Failed to create a task", { error })
    })
  }

  updateProject(id, name, priority, color, status, success, failure) {
    this.user.collection("Projects").doc(id).update({
      Name: name,
      Color: color,
      Status: status,
      Priority: priority
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to update the project", { id, error })
    })
  }

  updateTasks(msg, success, failure) {
    this.db.runTransaction(transaction => {
      msg["Tasks"].forEach(task => {
        let pid = task["ProjectId"]
        let tid = task["TaskId"]
        let data = {}
        for (let field of [ "Name", "Description", "Status", "Priority" ]) {
          if (field in task) {
            data[field] = task[field]
          }
        }
        let doc = this.user.collection("Projects").doc(pid).collection("Tasks").doc(tid)
        transaction.update(doc, data)
      })
      return Promise.resolve()
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to update the tasks", { error })
    })
  }

  removeProject(id, success, failure) {
    this.user.collection("Projects").doc(id).delete().then(() => {
      success()
    }).catch(error => {
      failure("Failed to remove the project", { id, error })
    })
  }

  removeTask(pid, tid, success, failure) {
    this.user.collection("Projects").doc(pid).collection("Tasks").doc(tid).delete().then(() => {
      success()
    }).catch(error => {
      failure("Failed to remove the task", { pid, tid, error })
    })
  }

}

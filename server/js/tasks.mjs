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

  getIdle(success, failure) {
    this.get(this.user.collection("Projects").where("Status", "==", "Idle"), success, failure)
  }

  sprint(success, failure) {
    return this.user.collection("Projects").where("Status", "==", "Active").get().then(projects => {
      let promises = []
      projects.forEach(project => {
        let color = project.data()["Color"]
        promises.push(project.ref.collection("Tasks").where("Status", "in", [ "Ready", "Started", "Finished" ]).get().then(tasks => {
          let sprint = []
          tasks.forEach(task => {
            let data = task.data()
            data["ProjectId"] = project.id
            data["TaskId"] = task.id
            data["Color"] = color
            sprint.push(data)
          })
          return sprint
        }))
      })
      return Promise.all(promises)
    }).then(data => {
      let sprint = data.flat()
      sprint.sort((a, b) => a["Priority"] - b["Priority"])
      return this.user.update({ "Sprint": sprint })
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to cache current sprint", { error })
    })
  }

  createProject(name, priority, color, status, success, failure) {
    let pid = null
    this.user.collection("Projects").add({
      Name: name,
      Color: color,
      Status: status,
      Priority: priority
    }).then(doc => {
      pid = doc.id
      return this.user.update({ "Projects": Firestore.FieldValue.increment(1) })
    }).then(() => {
      success("ProjectCreated", { ProjectId: pid })
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
      return this.sprint(success, failure)
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
      return this.sprint(success, failure)
    }).catch(error => {
      failure("Failed to update the tasks", { error })
    })
  }

  removeProject(id, success, failure) {
    this.user.collection("Projects").doc(id).update({ "Status": "Deleted" }).then(() => {
      return this.sprint(success, failure)
    }).then(() => {
      return this.user.update({ "Projects": Firestore.FieldValue.increment(-1) })
    }).catch(error => {
      failure("Failed to remove the project", { id, error })
    })
  }

  removeTask(pid, tid, success, failure) {
    this.user.collection("Projects").doc(pid).collection("Tasks").doc(tid).delete().then(() => {
      return this.sprint(success, failure)
    }).catch(error => {
      failure("Failed to remove the task", { pid, tid, error })
    })
  }

}

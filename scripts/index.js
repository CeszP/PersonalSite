class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id
        this.title = title
        this.description = description
        this.imgUrl = imgUrl
    }
}
class Repository{
    constructor(){
        this.activities = []
        this.id = 0        
    }
    
    getAllActivities(){
        return this.activities
    }
    
    createActivity(title, description, imgUrl){
        const  id = this.id++
        const activity = new Activity(id, title, description, imgUrl)
        
        this.activities.push(activity)
        
        return activity              
    }
    
    deleteActivity(id){
        if(this.activities.length === 0){
            throw new Error('No activities to delete.')
        }
        
        const index = this.activities.findIndex(activity => activity.id == id)
        
        if(index !== -1){
            this.activities.splice(index,1)
            return true
        }else{
            throw new Error(`Activity with ID ${id} not found.`)
        }       
    }
}
// USER INTERFACE CLASS
class UI {
    static clearFormFields() {
        document.getElementById('name-input').value = ''
        document.getElementById('description-input').value = ''
        document.getElementById('imgUrl-input').value = ''
    }

    static displayActivity(newActivity) {
        const activityDiv = document.createElement('div')
        activityDiv.classList.add('activity-card')
        activityDiv.id = `activity-${newActivity.id}`
        activityDiv.style.backgroundImage = `url(${newActivity.imgUrl})`
        activityDiv.innerHTML = `<button class='delete-button' data-id="${newActivity.id}"></button>
                                 <p class='card-title'>${newActivity.title}</p>
                                 <p class='card-desc'>${newActivity.description}</p>`

        const activitiesContainer = document.getElementById('activities-container')
        activitiesContainer.appendChild(activityDiv)
        this.displayAllActivities()
    }

    static displayAllActivities(){
        const activitiesContainer = document.getElementById('activities-container')

        // EMPTY CONTAINER
        activitiesContainer.innerHTML = ''

        // FULL LIST OF ACTIVITIES
        const allActivities = repo.getAllActivities()

        // MAP ALL THE ELEMENTS TO BE CONVERTED TO HTML
        const activityElements = allActivities.map(activity => {
            const activityDiv = document.createElement('div')
            activityDiv.classList.add('activity-card')
            activityDiv.id = `activity-${activity.id}`
            activityDiv.style.backgroundImage = `url(${activity.imgUrl})`
            activityDiv.innerHTML = `<button class='delete-button' data-id="${activity.id}"></button>
                                     <p class='card-title'>${activity.title}</p>
                                     <p class='card-desc'>${activity.description}</p>`
            return activityDiv
        });

        // APPEND ALL ELEMENTS
        activityElements.forEach(activityElement => {
            activitiesContainer.appendChild(activityElement)
        });
    }
}

const repo = new Repository();

// EVENT LISTENER FOR DELETE BUTTON
document.getElementById('activities-container').addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
        const id = event.target.getAttribute('data-id')
        try {
            const deleted = repo.deleteActivity(id)
    
            if (deleted) {
                // DELETE DIV FROM DOM
                const activityDiv = document.getElementById(`activity-${id}`)
                activityDiv.remove()
            } else {
                console.error(`Activity with ID ${id} not found.`)
            }
        } catch (error) {
            console.error('Error deleting activity:', error.message)
        }
    }
});
// EVENT LISTENER FOR ADD BUTTON
document.getElementById('add-button').addEventListener('click', function(event){
    event.preventDefault()

    const name = document.getElementById('name-input').value
    const description = document.getElementById('description-input').value
    const url = document.getElementById('imgUrl-input').value

    if (!name || !description || !url) {
        alert("Are you kidding me? Please fill all the fields.")
        console.log("All fields are required.")
        return
    }

    try {
        const newActivity = repo.createActivity(name, description, url)
        UI.displayActivity(newActivity)
        UI.clearFormFields()
    } catch (error) {
        console.error('Error adding activity:', error.message)
    }
})
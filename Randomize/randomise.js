let student = []
let randomisedStudent = []
let groupedStudents = []

const totalStudents = document.getElementById('total')
const sizeOfGroup = document.getElementById('sizeOfGroup')
const showGroups = document.getElementById('groups')
const prefix = document.getElementById('prefix')
const generateGroupsButton = document.getElementById('generate')

function renderArray(someThing)
{
    for(let i = 0; i < someThing; i++)
    {
        student.push(i+1)
    }
}

function getRandom(some)
{
    return Math.floor(Math.random()*some)
}

generateGroupsButton.addEventListener("click", function(event){
    student = []
    randomisedStudent = []
    groupedStudents = []
    
    let numTotalStudents = totalStudents.value
    let numSizeOfGroup = sizeOfGroup.value
    let numOfGroups = Math.ceil(numTotalStudents/numSizeOfGroup)
    let prefixId = prefix.value
    if(prefixId === "")
    {
        prefixId = "Roll No. "
    }
    let padLen = String(totalStudents.value).length

    renderArray(numTotalStudents)
    totalStudents.value = ""
    sizeOfGroup.value = ""

    generateRandomArray(student)
    decomposeRandomArray(randomisedStudent, numSizeOfGroup, numOfGroups)

    showRandomisedGroups(groupedStudents, numSizeOfGroup, prefixId, padLen)

    prefix.value = ""
    event.preventDefault()
})

function generateRandomArray(someThing)
{
    for(let i = someThing.length; i > 0; i--)
    {
        randomIndex = getRandom(i)
        randomisedStudent.push(someThing[randomIndex])
        someThing.splice(randomIndex,1)
    }
}

function decomposeRandomArray(someThing, someNum, someOtherNum)
{
    for(let i = 0; i < someOtherNum; i++)
    {
        groupedStudents.push(someThing.slice(i*someNum, (i+1)*(someNum)))
    }
}

function showRandomisedGroups(someThing, someNum, somePrefix, padL)
{
    showGroups.innerHTML = ``
    for(let i = 0; i < someThing.length-1; i++)
    {
        showGroups.innerHTML += `
        <li class="teamName">
            Team ${i+1}
        </li>
        <br>
        `
        
        for(let j = 0; j < someNum; j++)
        {
            showGroups.innerHTML += `
            <li>
                ${somePrefix}${String(someThing[i][j]).padStart(padL,'0')}
            </li>
            `
        }

        showGroups.innerHTML += `
        <br>
        <br>
        `
    }

    showGroups.innerHTML += `
    <li class="teamName">
        Team ${someThing.length}
    </li>
    <br>
    `

    for(let i = 0; i < someThing[someThing.length-1].length; i++)
    {
        showGroups.innerHTML += `
        <li>
            ${somePrefix}${String(someThing[someThing.length-1][i]).padStart(padL,'0')}
        </li>
        `
    }
}

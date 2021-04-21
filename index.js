// Your code here
const createEmployeeRecord = (infoArr) => {
  return {
    firstName: infoArr[0],
    familyName: infoArr[1],
    title: infoArr[2],
    payPerHour: infoArr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = (arrs) => {
  return arrs.map(arr => createEmployeeRecord(arr))
}

const createTimeInEvent = (infoObj, time) => {
  let [date, hour] = time.split(' ')
  infoObj.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
  })
  // const timeInInfo = {
  //   type: "TimeIn",
  //   hour: parseInt(time.slice(-4)),
  //   date: time.slice(0, 10)
  // }
  // infoObj.timeInEvents.push(timeInInfo)
  return infoObj
}

const createTimeOutEvent = (infoObj, time) => {
  let [date, hour] = time.split(' ')
  infoObj.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
  })
  // const timeOutInfo = {
  //   type: "TimeOut",
  //   hour: parseInt(time.slice(-4)),
  //   date: time.slice(0, 10)
  // }
  // infoObj.timeOutEvents.push(timeOutInfo)
  return infoObj
}

const hoursWorkedOnDate = (infoObj, date) => {
  const timein = infoObj.timeInEvents.find(timeIn => timeIn.date === date).hour
  const timeout = infoObj.timeOutEvents.find(timeOut => timeOut.date === date).hour
  return (timeout - timein) / 100
}

const wagesEarnedOnDate = (infoObj, date) => {
  return hoursWorkedOnDate(infoObj, date) * infoObj.payPerHour
}

const allWagesFor = (employeeRecord) => {
  const timeIns = employeeRecord.timeInEvents
  return timeIns.reduce((sum, timein) => sum + wagesEarnedOnDate(employeeRecord, timein.date), 0)
}

const calculatePayroll = (employeesArr) => {
  return employeesArr.reduce((sum, employee) => sum + allWagesFor(employee), 0)
}

const findEmployeeByFirstName = (employeesArr, name) => {
  return employeesArr.find(employee => employee.firstName === name)
}
"use client";
import React from 'react';
import { useState, useRef } from 'react';


export default function Home() {
  const [standupPeople, setStandupPeople] = useState(["Martin", "Denny", "Sam", "Georgi", "Harsweet", "Jaela", "John", "Michelle", "Mike", "Nick", "Seyed", "Eric", "Volod"])
  const [selectedPerson, setSelectedPerson] = useState("")
  const [parkingLotPeople, setParkingLotPeople] = useState([])
  const [parkingLotMode, setParkingLotMode] = useState(false)
  const [startStandup, setStartStandup] = useState(true)
  const [standupIndexToRemove, setStandupIndexToRemove] = useState(null)
  const [parkingLotIndexToRemove, setParkingLotIndexToRemove] = useState(null)
  return (
    <main>
      <div className="flex items-center justify-center h-10">
        <h1>STAND UP TIME!</h1>
      </div>

      <div className="flex mb-4">
        <div className="w-3/5 h-5">
          {nextCodeFreeze()}
          {nextRelease()}
        </div>

        <div className="w-1/5 h-15">
          <h1>People who need to Stand Up</h1>
          <ul>
            {standupPeople.map(person => <li key={`standup-${person}`}>{person}</li>)}
          </ul>
        </div>

        <div className="w-1/5 h-15">
          <h1>Parking Lot Participants</h1>
          <ul>
            {parkingLotPeople.map(person => <li key={`standup-${person}`}>{person}</li>)}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center h-40">
        {getStandupQuestions()}
      </div>

      <div className="flex items-center justify-center h-40 text-2xl">
        {getCurrentText()}
      </div>

      <div className="flex items-center justify-center h-2">
        <div className="inline-flex">
          {personButton()}
          {
            selectedPerson && !parkingLotMode &&
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={addToParkingLot}>Has Parking Lot Topic</button>
          }
        </div>
      </div>
    </main>
  )


  function nextPerson() {
    setStartStandup(false)
    const standupCopy = standupPeople
    const parkingLotCopy = parkingLotPeople

    if (standupIndexToRemove != null){
      standupCopy.splice(standupIndexToRemove, 1)
      setStandupPeople(standupCopy)
      setStandupIndexToRemove(null)
    }
    else if (parkingLotIndexToRemove != null){
      parkingLotCopy.splice(parkingLotIndexToRemove, 1)
      setParkingLotPeople(parkingLotCopy)
      setParkingLotIndexToRemove(null)
    }

    if (standupCopy.length > 0) {
    const randomIndex = Math.floor(Math.random() * standupCopy.length)
    setStandupIndexToRemove(randomIndex)
    const person = standupCopy[randomIndex]
    setSelectedPerson(person)
    }

    else if (parkingLotCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * parkingLotCopy.length)
      const person = parkingLotCopy[randomIndex]
      setSelectedPerson(person)
      setParkingLotMode(true)
      setParkingLotIndexToRemove(randomIndex)
    }
    else {
      setParkingLotMode(false)
      setSelectedPerson("")
    }
  }


  function addToParkingLot() {
    console.log(`adding ${selectedPerson} to parking lot`)
    setParkingLotPeople([...parkingLotPeople, selectedPerson])
  }

  function getStandupQuestions() {
    if (!parkingLotMode && !startStandup && standupPeople.length > 0) {
      return (
      <div className="items-center justify-center h-10">
        <h1>Update us on...</h1>
        <br></br>
        <h2>Pick a turtle 🐢</h2>
        <h2>How did yesterday go?</h2>
        <h2>What's the plan for today?</h2>
      </div>
      )
    }
  }

  function getCurrentText() {
    if (standupPeople.length > 0) {
      if (selectedPerson) {
        return ( <h2>It is your turn <b>{selectedPerson}</b>!</h2> )
      }
    }
    else if (parkingLotMode) {
          return ( <h2><b>{selectedPerson}</b> has a topic for Parking Lot</h2> )
    }
    else if (parkingLotPeople.length == 0 && standupPeople.length == 0) {
        const day = getDayOfTheWeek()
        return ( <h2>All done! Have a great {day}! </h2>)
      }
    }

  function personButton() {
    if (selectedPerson && (standupPeople.length > 0 || (parkingLotMode && parkingLotPeople.length > 0))) {
      return <button className={"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"} onClick={nextPerson}>Next</button>
    }
    else if(parkingLotPeople.length > 1) {
      return <button className={"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"} onClick={nextPerson}>Go into the Parking Lot</button>
    }
    else if(startStandup){
      return <button className={"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"} onClick={nextPerson}>Start Standup</button>
    }
    else{
      return <button className={"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"} onClick={finishStandup}>Finish Standup</button>
    }
  }

  function getDayOfTheWeek() {
    return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()]
  }

  function nextCodeFreeze() {
    const today = new Date()
    const previousCodeFreeze = new Date("2023-09-21")
    const daysUntilNextFreeze = 14 - (daysBetweenDates(previousCodeFreeze, today) % 14)


    return (<h2>Next Code Freeze is in <b>{daysUntilNextFreeze} days</b></h2>)
  }

  function nextRelease() {
    const today = new Date()
    const previousRelease = new Date("2023-09-27")
    const daysUntilNextRelease = 14 - (daysBetweenDates(previousRelease, today) % 14)
    return (<h2>Next Release is in <b>{daysUntilNextRelease} days</b></h2>)
  }

  function daysBetweenDates(d1, d2) {
    const timeDifference = d2.getTime() - d1.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24)
    return Math.floor(dayDifference)
  }

  function finishStandup(){
    setParkingLotPeople([])
    setStandupPeople([])
    setSelectedPerson("")
    setParkingLotMode(false)
  }
}

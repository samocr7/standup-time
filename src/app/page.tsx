"use client";
import React from 'react';
import { useState, useRef } from 'react';


export default function Home() {
  const [standupPeople, setStandupPeople] = useState(["Sam", "Sam2", "Sam3", "Sam4", "Sam5", "Sam6"])
  const [selectedPerson, setSelectedPerson] = useState("")
  const [parkingLotPeople, setParkingLotPeople] = useState([])
  const [parkingLotMode, setParkingLotMode] = useState(false)

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
    if (standupPeople.length > 0) {
    const standupPeopleCopy = standupPeople
    const randomIndex = Math.floor(Math.random() * standupPeopleCopy.length)
    const person = standupPeopleCopy.splice(randomIndex, 1)
    setSelectedPerson(person)
    setStandupPeople(standupPeopleCopy)
    }

    else if (parkingLotPeople.length > 0) {
      const parkingLotPeopleCopy = parkingLotPeople
      const randomIndex = Math.floor(Math.random() * parkingLotPeopleCopy.length)
      const person = parkingLotPeople.splice(randomIndex, 1)

      setSelectedPerson(person)
      setStandupPeople(parkingLotPeopleCopy)
      setParkingLotMode(true)
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

  function getCurrentText() {
    const day = getDayOfTheWeek()
    if (standupPeople.length > 0) {
      if (selectedPerson) {
        return ( <h2>It is your turn <b>{selectedPerson}</b>!</h2> )
      }
    }
    else if (parkingLotMode) {
          return ( <h2><b>{selectedPerson}</b> has a topic for Parking Lot</h2> )
    }
    else if (parkingLotPeople.length == 0 && standupPeople.length == 0) {
        return ( <h2>All done! Have a great {day}! </h2>)
      }
    }

  function personButton() {


    if (selectedPerson && standupPeople.length > 0) {
      return <button className={"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"} onClick={nextPerson}>Next</button>
    }
    else if(parkingLotPeople.length > 0) {
      return <button className={"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"} onClick={nextPerson}>Go into the Parking Lot</button>
    }
    else{
      return <button className={"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"} onClick={nextPerson}>Start Standup</button>
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
}

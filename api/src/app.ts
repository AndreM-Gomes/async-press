import express from 'express'
import { CoreContainner } from "./coreContainner";
const core = new CoreContainner(express(), 3000)

core.start()
  .catch((e: Error) => {
    console.trace()
    console.error(`Unhandled exception -> ${e}`)
  })

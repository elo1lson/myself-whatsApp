'use strict'

import { readdirSync } from "fs"
import { resolve } from "path";
import { cwd } from "process";

export default function loadCommand(bot) {
  bot.commands = new Map()
  let baseDir = resolve(cwd(), 'src/command')
  let folder = readdirSync(baseDir)

  folder.forEach(async name => {
    let commandClass = await import(`${baseDir}/${name}`)
    let command = new commandClass.default()
    bot.commands.set(command.name, command)

  })
}
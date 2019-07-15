import examples from "components/examples"
import { mount } from "@vue/test-utils"

describe("Examples", () => {

  let vm = mount(examples).vm

  it("handles 'To recover from the divorce, I threw myself into a whirlwind of activities'", () => {
    const disguised = vm.concealWords("To recover from the divorce, I threw myself into a whirlwind of activities", [ "whirlwind" ])
    expect(disguised).toBe("To recover from the divorce, I threw myself into a ~ of activities")
  })
/*
  it("handles 'The job doesn't sound very exciting but I'll give it a whirl'", () => {
    const disguised = vm.concealWords("The job doesn't sound very exciting but I'll give it a whirl", [ "give", "sth", "a", "whirl" ])
    expect(disguised).toBe("The job doesn't sound very exciting but I'll ~ it ~ ~")
  })

  it("handles 'Newspapers fulminating against governments's incompetence'", () => {
    const disguised = vm.concealWords("Newspapers fulminating against goverments's incompetence", [ "fulminate" ])
    expect(disguised).toBe("Newspapers ~ing against goverments's incompetence")
  })

  it("handles 'Although this may be unattainable, we can certainly get a lot closer than we are now'", () => {
    const disguised = vm.concealWords("Although this may be unattainable, we can certainly get a lot closer than we are now", [ "unattainable" ])
    expect(disguised).toBe("Although this may be ~, we can certainly get a lot closer than we are now")
  })

  it("handles 'Just simmer down and stop shouting'", () => {
    const disguised = vm.concealWords("Just simmer down and stop shouting", [ "simmer", "down" ])
    expect(disguised).toBe("Just ~ ~ and stop shouting")
  })

  it("handles 'In these days of financial stringency'", () => {
    const disguised = vm.concealWords("In these days of financial stringency", [ "stringency" ])
    expect(disguised).toBe("In these days of financial ~")
  })

  it("handles 'He clutched at the branch but he couldn't reach it'", () => {
    const disguised = vm.concealWords("He clutched at the branch but he couldn't reach it", [ "clutch", "catch", "at", "sth" ])
    expect(disguised).toBe("He ~ed ~ the branch but he couldn't reach it")
  })

  it("handles 'I'm just clutching at straws, but is it possible that the doctors are wrong?'", () => {
    const disguised = vm.concealWords("I'm just clutching at straws, but is it possible that the doctors are wrong?", [ "clutch", "grasp", "at", "straws" ])
    expect(disguised).toBe("I'm just ~ing ~ ~, but is it possible that the doctors are wrong?")
  })

  it("handles 'When the crew mutinied he was cast adrift in a small boat without food'", () => {
    const disguised = vm.concealWords("When the crew mutinied he was cast adrift in a small boat without food", [ "cast", "sb", "adrift" ])
    expect(disguised).toBe("When the crew mutinied he was ~ ~ in a small boat without food")
  })

  it("handles 'Would you cast your eye over these calculations to check that they are correct'", () => {
    const disguised = vm.concealWords("Would you cast your eye over these calculations to check that they are correct", [ "cast", "an", "eye", "one's", "eyes", "over", "sb", "sth" ])
    expect(disguised).toBe("Would you ~ ~ ~ ~ these calculations to check that they are correct")
  })

  it("handles 'Recent research has shed new light on the causes of the disease'", () => {
    const disguised = vm.concealWords("Recent research has shed new light on the causes of the disease", [ "cast", "shed", "throw", "light", "on", "sth" ])
    expect(disguised).toBe("Recent research has ~ new ~ ~ the causes of the disease")
  })

  it("handles 'His brother is a thoroughly bad lot'", () => {
    const disguised = vm.concealWords("His brother is a thoroughly bad lot", [ "a", "bad", "lot" ])
    expect(disguised).toBe("His brother is ~ thoroughly ~ ~")
  })

  it("handles 'She cast her mind back to her wedding day'", () => {
    const disguised = vm.concealWords("She cast her mind back to her wedding day", [ "cast", "one's", "mind", "back" ])
    expect(disguised).toBe("She ~ ~ ~ ~ to ~ wedding day")
  })

  it("handles 'The company is casting its net wide in the search for a new sales director'", () => {
    const disguised = vm.concealWords("The company is casting its net wide in the search for a new sales director", [ "cast", "one's", "net", "wide" ])
    expect(disguised).toBe("The company is ~ing ~ ~ ~ in the search for a new sales director")
  })

  it("handles 'The votes have all been cast - they're now being counted'", () => {
    const disguised = vm.concealWords("The votes have all been cast - they're now being counted", [ "cast", "a", "one's", "vote" ])
    expect(disguised).toBe("The ~s have all been ~ - they're now being counted")
  })

  it("handles 'She defied her parents and got married'", () => {
    const disguised = vm.concealWords("She defied her parents and got married", [ "defy", "defiant" ])
    expect(disguised).toBe("She ~ed her parents and got married")
  })

  it("handles 'She has cast her old friends aside'", () => {
    const disguised = vm.concealWords("She has cast her old friends aside", [ "cast", "sb", "sth", "aside" ])
    expect(disguised).toBe("She has ~ her old friends ~")
  })

  it("handles 'I tossed up wheteher to tell her now or later'", () => {
    const disguised = vm.concealWords("I tossed up wheteher to tell her now or later", [ "toss", "up" ])
    expect(disguised).toBe("I ~ed ~ wheteher to tell her now or later")
  })

  it("handles 'It's not worth arguing the toss over such a trivial matter'", () => {
    const disguised = vm.concealWords("It's not worth arguing the toss over such a trivial matter", [ "argue", "the", "toss" ])
    expect(disguised).toBe("It's not worth ~ing ~ ~ over such a trivial matter")
  })

  it("handles 'A drug that suppresses muscle spasms'", () => {
    const disguised = vm.concealWords("A drug that suppresses muscle spasms", [ "suppress" ])
    expect(disguised).toBe("A drug that ~s muscle spasms")
  })

  it("handles 'I dug into history a bit, reading papers by Boltzmann and his contemporaries'", () => {
    const disguised = vm.concealWords("I dug into history a bit, reading papers by Boltzmann and his contemporaries", [ "contemporary" ])
    expect(disguised).toBe("I dug into history a bit, reading papers by Boltzmann and his ~s")
  })

  it("handles 'Embark on a long journey'", () => {
    const disguised = vm.concealWords("Embark on a long journey", [ "embark", "on", "upon", "sth" ])
    expect(disguised).toBe("~ ~ a long journey")
  })

  it("handles 'Stick around, we may need you'", () => {
    const disguised = vm.concealWords("Stick around, we may need you", [ "stick", "around" ])
    expect(disguised).toBe("~ ~, we may need you")
  })

  it("handles 'He lusted for revange'", () => {
    const disguised = vm.concealWords("He lusted for revange", [ "lust", "after", "for", "sb", "sth" ])
    expect(disguised).toBe("He ~ed ~ revange")
  })

  it("handles 'I've been lusting after Eames recliner for years'", () => {
    const disguised = vm.concealWords("I've been lusting after Eames recliner for years", [ "lust", "after", "for", "sb", "sth" ])
    expect(disguised).toBe("I've been ~ing ~ Eames recliner ~ years")
  })

  it("handles 'I'm at my wits' end worrying about how to pay the bills'", () => {
    const disguised = vm.concealWords("I'm at my wits' end worrying about how to pay the bills", [ "to", "be", "at", "one's", "wits'", "end" ])
    expect(disguised).toBe("I'm ~ ~ ~ ~ worrying about how ~ pay the bills")
  })

  it("handles 'You need to keep your wits about you when you are driving in London'", () => {
    const disguised = vm.concealWords("You need to keep your wits about you when you are driving in London", [ "have", "keep", "one's", "wits", "about", "one" ])
    expect(disguised).toBe("You need to ~ ~ ~ ~ you when you are driving in London")
  })

  it("handles 'Stick to the point - don't keep going off at a tangent'", () => {
    const disguised = vm.concealWords("Stick to the point - don't keep going off at a tangent", [ "go", "fly", "off", "at", "a", "tangent" ])
    expect(disguised).toBe("Stick to the point - don't keep ~ing ~ ~ ~ ~")
  })

  it("handles 'My parents threw a wobbly when I told them'", () => {
    const disguised = vm.concealWords("My parents threw a wobbly when I told them", [ "throw", "a", "wobbly" ])
    expect(disguised).toBe("My parents ~ ~ ~ when I told them")
  })

  it("handles 'Inflation is nudging 20%'", () => {
    const disguised = vm.concealWords("Inflation is nudging 20%", [ "nudge" ])
    expect(disguised).toBe("Inflation is ~ing 20%")
  })

  it("handles 'Memories of the accident stuck in my mind for ages'", () => {
    const disguised = vm.concealWords("Memories of the accident stuck in my mind for ages", [ "stick", "in", "one's", "mind" ])
    expect(disguised).toBe("Memories of the accident ~ ~ ~ ~ for ages")
  })

  it("handles 'She devoted herself to her career'", () => {
    const disguised = vm.concealWords("She devoted herself to her career", [ "devote", "oneself", "sth", "to", "sb" ])
    expect(disguised).toBe("She ~ed ~ ~ her career")
  })

  it("handles 'Don't go poking your nose into other people business!'", () => {
    const disguised = vm.concealWords("Don't go poking your nose into other people business!", [ "poke", "stick", "one's", "nose", "into", "sth" ])
    expect(disguised).toBe("Don't go ~ing ~ ~ ~ other people business!")
  })

  it("handles 'Stick up a bank/post office'", () => {
    const disguised = vm.concealWords("Stick up a bank/post office", [ "stick", "sth", "up" ])
    expect(disguised).toBe("~ ~ a bank/post office")
  })

  it("handles 'Stick up for yourself/your rights'", () => {
    const disguised = vm.concealWords("Stick up for yourself/your rights", [ "stick", "up", "for", "sb", "oneself", "sth" ])
    expect(disguised).toBe("~ ~ ~ ~/your rights")
  })

  it("handles 'You obviously have a vested interest in Tim's resignation (eg because you may get his job)'", () => {
    const disguised = vm.concealWords("You obviously have a vested interest in Tim's resignation (eg because you may get his job)", [ "vested", "interest" ])
    expect(disguised).toBe("You obviously have a ~ ~ in Tim's resignation (eg because you may get his job)")
  })

  it("handles ''Why did you agree to do it?' 'They kept hustling me.''", () => {
    const disguised = vm.concealWords("'Why did you agree to do it?' 'They kept hustling me.'", [ "hustle" ])
    expect(disguised).toBe("'Why did you agree to do it?' 'They kept ~ing me.'")
  })

  it("handles 'They sheepishly asked if I would pose for a picture with them'", () => {
    const disguised = vm.concealWords("They sheepishly asked if I would pose for a picture with them", [ "sheepish" ])
    expect(disguised).toBe("They ~ly asked if I would pose for a picture with them")
  })

  it("handles 'He never goes back on his word'", () => {
    const disguised = vm.concealWords("He never goes back on his word", [ "go", "back", "on", "sth" ])
    expect(disguised).toBe("He never ~s ~ ~ his word")
  })

  it("handles 'The movie was lushly filmed with dramatic scenes of waterfalls and forests and mountains'", () => {
    const disguised = vm.concealWords("The movie was lushly filmed with dramatic scenes of waterfalls and forests and mountains", [ "lush" ])
    expect(disguised).toBe("The movie was ~ly filmed with dramatic scenes of waterfalls and forests and mountains")
  })

  it("handles 'Guests are encouraged to avail themselves of the full range of hotel facilities'", () => {
    const disguised = vm.concealWords("Guests are encouraged to avail themselves of the full range of hotel facilities", [ "avail", "oneself", "of", "sth" ])
    expect(disguised).toBe("Guests are encouraged to ~ ~ ~ the full range ~ hotel facilities")
  })

  it("handles 'Being short of money, I made a virtue of necessity and gave up smoking'", () => {
    const disguised = vm.concealWords("Being short of money, I made a virtue of necessity and gave up smoking", [ "make", "a", "virtue", "of", "necessity" ])
    expect(disguised).toBe("Being short ~ money, I ~ ~ ~ ~ ~ and gave up smoking")
  })

  it("handles 'The enormities of the Hitler regime'", () => {
    const disguised = vm.concealWords("The enormities of the Hitler regime", [ "enormity" ])
    expect(disguised).toBe("The ~s of the Hitler regime")
  })

  it("handles 'Put him to bed until he sobers up'", () => {
    const disguised = vm.concealWords("Put him to bed until he sobers up", [ "sober", "sb", "up" ])
    expect(disguised).toBe("Put him to bed until he ~s ~")
  })

  it("handles 'Children frolicking (about) in the swimming-pool'", () => {
    const disguised = vm.concealWords("Children frolicking (about) in the swimming-pool", [ "frolic" ])
    expect(disguised).toBe("Children ~ing (about) in the swimming-pool")
  })

  it("handles 'She seemed perversely proud of her criminal record'", () => {
    const disguised = vm.concealWords("She seemed perversely proud of her criminal record", [ "perverse" ])
    expect(disguised).toBe("She seemed ~ly proud of her criminal record")
  })

  it("handles 'The gruesome sight sent a shiver down my spine'", () => {
    const disguised = vm.concealWords("The gruesome sight sent a shiver down my spine", [ "send", "a", "shiver", "down", "sb's", "spine" ])
    expect(disguised).toBe("The gruesome sight ~ ~ ~ ~ ~ ~")
  })

  it("handles 'So seeing what the Hubble sees in 3D… is a contradiction in terms'", () => {
    const disguised = vm.concealWords("So seeing what the Hubble sees in 3D… is a contradiction in terms", [ "contradiction", "in", "terms" ])
    expect(disguised).toBe("So seeing what the Hubble sees ~ 3D… is a ~ ~ ~")
  })

  it("handles 'I spent the whole day wading through the paperwork on my desk'", () => {
    const disguised = vm.concealWords("I spent the whole day wading through the paperwork on my desk", [ "wade", "through", "sth" ])
    expect(disguised).toBe("I spent the whole day ~ing ~ the paperwork on my desk")
  })

  it("handles 'The newspapers have biased people against her'", () => {
    const disguised = vm.concealWords("The newspapers have biased people against her", [ "bias" ])
    expect(disguised).toBe("The newspapers have ~ed people against her")
  })

  it("handles 'The captain copped most of the blame for his team performance'", () => {
    const disguised = vm.concealWords("The captain copped most of the blame for his team performance", [ "cop" ])
    expect(disguised).toBe("The captain ~ed most of the blame for his team performance")
  })

  it("handles 'The vent has been sensationalized by the media'", () => {
    const disguised = vm.concealWords("The vent has been sensationalized by the media", [ "sensationalize" ])
    expect(disguised).toBe("The vent has been ~ed by the media")
  })

  it("handles 'They clung to each other/clung together as they said goodbye'", () => {
    const disguised = vm.concealWords("They clung to each other/clung together as they said goodbye", [ "cling", "clung" ])
    expect(disguised).toBe("They ~ to each other/~ together as they said goodbye")
  })

  it("handles 'The astronomical community is anxiously awaiting tomorrow’s press conference on the release of the “Astro 2010 Decadal Survey”'", () => {
    const disguised = vm.concealWords("The astronomical community is anxiously awaiting tomorrow’s press conference on the release of the “Astro 2010 Decadal Survey”", [ "anxious", "anxiously", "anxiety" ])
    expect(disguised).toBe("The astronomical community is ~ly awaiting tomorrow’s press conference on the release of the “Astro 2010 Decadal Survey”")
  })

  it("handles 'I just plucked a figure out of the air and said: Would 1000 seem reasonable to you?'", () => {
    const disguised = vm.concealWords("I just plucked a figure out of the air and said: Would 1000 seem reasonable to you?", [ "pluck", "sth", "out", "of", "the", "air" ])
    expect(disguised).toBe("I just ~ed a figure ~ ~ ~ ~ and said: Would 1000 seem reasonable to you?")
  })

  it("handles 'He said the spiders had also turned up in the port city of Osaka (which receives a variety of Australian trade goods) in the late 1990s and had multiplied quickly.'", () => {
    const disguised = vm.concealWords("He said the spiders had also turned up in the port city of Osaka (which receives a variety of Australian trade goods) in the late 1990s and had multiplied quickly.", [ "turn", "up" ])
    expect(disguised).toBe("He said the spiders had also ~ed ~ in the port city of Osaka (which receives a variety of Australian trade goods) in the late 1990s and had multiplied quickly.")
  })

  it("handles 'According to the latest available projections, the total population of Australia is likely to have increased to 22 and 23 mln by 2021.'", () => {
    const disguised = vm.concealWords("According to the latest available projections, the total population of Australia is likely to have increased to 22 and 23 mln by 2021.", [ "according", "to" ])
    expect(disguised).toBe("~ ~ the latest available projections, the total population of Australia is likely ~ have increased ~ 22 and 23 mln by 2021.")
  })

  it("handles 'The standard rate of income tax was cut to 23p in the pound.'", () => {
    const disguised = vm.concealWords("The standard rate of income tax was cut to 23p in the pound.", [ "income", "tax" ])
    expect(disguised).toBe("The standard rate of ~ ~ was cut to 23p in the pound.")
  })

  it("handles 'The skirt does up at the back.'", () => {
    const disguised = vm.concealWords("The skirt does up at the back.", [ "do", "up" ])
    expect(disguised).toBe("The skirt ~s ~ at the back.")
  })

  it("handles 'We bought a camper van so we could go away whenever the fancy took us'", () => {
    const disguised = vm.concealWords("We bought a camper van so we could go away whenever the fancy took us", [ "as", "whenever", "the", "fancy", "takes", "you", "us" ])
    expect(disguised).toBe("We bought a camper van so we could go away ~ ~ ~ ~ ~")
  })
  // LAST

  it("handles 'An increase in the prevalence of smoking among young people'", () => {
    const disguised = vm.concealWords("An increase in the prevalence of smoking among young people", [ "prevalent", "common", "widespread", "prevalence" ])
    expect(disguised).toBe("An increase in the ~ of smoking among young people")
  })

  it("handles 'To carry out an inquiry/an investigation/a survey'", () => {
    const disguised = vm.concealWords("To carry out an inquiry/an investigation/a survey", [ "carry", "sth", "out" ])
    expect(disguised).toBe("To ~ ~ an inquiry/an investigation/a survey")
  })

  it("handles 'Extensive tests have been carried out on the patient'", () => {
    const disguised = vm.concealWords("Extensive tests have been carried out on the patient", [ "carry", "sth", "out" ])
    expect(disguised).toBe("Extensive tests have been ~ed ~ on the patient")
  })

  it("handles 'Research carried out into the composition of prehistoric mud has been found to be inaccurate'", () => {
    const disguised = vm.concealWords("Research carried out into the composition of prehistoric mud has been found to be inaccurate", [ "carry", "sth", "out" ])
    expect(disguised).toBe("Research ~ed ~ into the composition of prehistoric mud has been found to be inaccurate")
  })

  it("handles 'To carry out a promise/a threat/a plan/an order'", () => {
    const disguised = vm.concealWords("To carry out a promise/a threat/a plan/an order", [ "carry", "sth", "out" ])
    expect(disguised).toBe("To ~ ~ a promise/a threat/a plan/an order")
  })

  it("handles 'Choose curtains that blend in with your decor'", () => {
    const disguised = vm.concealWords("Choose curtains that blend in with your decor", [ "blend", "in", "with", "sth", "sb" ])
    expect(disguised).toBe("Choose curtains that ~ ~ ~ your decor")
  })

  it("handles 'The thieves soon blended in with the crowd and got away'", () => {
    const disguised = vm.concealWords("The thieves soon blended in with the crowd and got away", [ "blend", "in", "with", "sth", "sb" ])
    expect(disguised).toBe("The thieves soon ~ed ~ ~ the crowd and got away")
  })

  it("handles 'He thinks it is time we did have away with the monarchy.'", () => {
    const disguised = vm.concealWords("He thinks it is time we did have away with the monarchy.", [ "do", "away", "with" ])
    expect(disguised).toBe("He thinks it is time we ~ have ~ ~ the monarchy.")
  })

  it("handles 'Nobody likes him because he is always doing people down.'", () => {
    const disguised = vm.concealWords("Nobody likes him because he is always doing people down.", [ "do", "down" ])
    expect(disguised).toBe("Nobody likes him because he is always ~ing people ~.")
  })

  it("handles 'He threatened to do her in if she didn't cooperate'", () => {
    const disguised = vm.concealWords("He threatened to do her in if she didn't cooperate", [ "do", "in" ])
    expect(disguised).toBe("He threatened to ~ her ~ if she didn't cooperate")
  })

  it("handles 'Come and down sit - you look done in.'", () => {
    const disguised = vm.concealWords("Come and down sit - you look done in.", [ "do", "in" ])
    expect(disguised).toBe("Come and down sit - you look ~ ~.")
  })

  it("handles 'The skirt does up at the back.'", () => {
    const disguised = vm.concealWords("The skirt does up at the back.", [ "do", "up" ])
    expect(disguised).toBe("The skirt ~s ~ at the back.")
  })

  it("handles 'I could do with a cup of tea.'", () => {
    const disguised = vm.concealWords("I could do with a cup of tea.", [ "do", "with" ])
    expect(disguised).toBe("I could ~ ~ a cup of tea.")
  })

  it("handles 'There is no Coke left - we'll have to do without.'", () => {
    const disguised = vm.concealWords("There is no Coke left - we'll have to do without.", [ "do", "without" ])
    expect(disguised).toBe("There is no Coke left - we'll have to ~ ~.")
  })

  it("handles 'Although he had promises up to help us, he drew back at the last time.'", () => {
    const disguised = vm.concealWords("Although he had promises up to help us, he drew back at the last time.", [ "draw", "back" ])
    expect(disguised).toBe("Although he had promises up to help us, he ~ ~ at the last time.")
  })

  it("handles 'On seeing the snake she drew back in terror.'", () => {
    const disguised = vm.concealWords("On seeing the snake she drew back in terror.", [ "draw", "back" ])
    expect(disguised).toBe("On seeing the snake she ~ ~ in terror.")
  })

  it("handles 'The train drew in and the passengers began to get off.'", () => {
    const disguised = vm.concealWords("The train drew in and the passengers began to get off.", [ "draw", "in" ])
    expect(disguised).toBe("The train ~ ~ and the passengers began to get off.")
  })

  it("handles 'She is very shy, sb should draw him out.'", () => {
    const disguised = vm.concealWords("She is very shy, sb should draw him out.", [ "draw", "out" ])
    expect(disguised).toBe("She is very shy, sb should ~ him ~.")
  })

  it("handles 'He drew out some money to pay his rent.'", () => {
    const disguised = vm.concealWords("He drew out some money to pay his rent.", [ "draw", "out" ])
    expect(disguised).toBe("He ~ ~ some money to pay his rent.")
  })

  it("handles 'The cab drew up outside the house'", () => {
    const disguised = vm.concealWords("The cab drew up outside the house", [ "draw", "up" ])
    expect(disguised).toBe("The cab ~ ~ outside the house")
  })

  it("handles 'My grandfa had a solicitor draw up his will last year.'", () => {
    const disguised = vm.concealWords("My grandfa had a solicitor draw up his will last year.", [ "draw", "up" ])
    expect(disguised).toBe("My grandfa had a solicitor ~ ~ his will last year.")
  })

  it("handles 'This book is so old that it's falling apart'", () => {
    const disguised = vm.concealWords("This book is so old that it's falling apart", [ "fall", "apart" ])
    expect(disguised).toBe("This book is so old that it's ~ing ~")
  })

  it("handles 'Keep some money in the bank to fall back on in case sth goes wrong'", () => {
    const disguised = vm.concealWords("Keep some money in the bank to fall back on in case sth goes wrong", [ "fall", "back", "on" ])
    expect(disguised).toBe("Keep some money in the bank to ~ ~ ~ in case sth goes wrong")
  })

  it("handles 'The company cancelled my credit card when I fell behind with my payments'", () => {
    const disguised = vm.concealWords("The company cancelled my credit card when I fell behind with my payments", [ "fall", "behind" ])
    expect(disguised).toBe("The company cancelled my credit card when I ~ ~ with my payments")
  })

  it("handles 'I'm surprised that you fall for that trick'", () => {
    const disguised = vm.concealWords("I'm surprised that you fall for that trick", [ "fall", "for" ])
    expect(disguised).toBe("I'm surprised that you ~ ~ that trick")
  })

  it("handles 'I am afraid the roof will fall in if an earthquake hits that area'", () => {
    const disguised = vm.concealWords("I am afraid the roof will fall in if an earthquake hits that area", [ "fall", "in" ])
    expect(disguised).toBe("I am afraid the roof will ~ ~ if an earthquake hits that area")
  })

  it("handles 'All members of the committee fell in with his suggestion to build a new hospital'", () => {
    const disguised = vm.concealWords("All members of the committee fell in with his suggestion to build a new hospital", [ "fall", "in", "with" ])
    expect(disguised).toBe("All members of the committee ~ ~ ~ his suggestion to build a new hospital")
  })

  it("handles 'This novel falls into the category of historical adventure.'", () => {
    const disguised = vm.concealWords("This novel falls into the category of historical adventure.", [ "fall", "into" ])
    expect(disguised).toBe("This novel ~s ~ the category of historical adventure.")
  })

  it("handles 'My talk fall naturally into three parts.'", () => {
    const disguised = vm.concealWords("My talk fall naturally into three parts.", [ "fall", "into" ])
    expect(disguised).toBe("My talk ~ naturally ~ three parts.")
  })

  it("handles 'I fell into a conversation with an interesting man on the train'", () => {
    const disguised = vm.concealWords("I fell into a conversation with an interesting man on the train", [ "fall", "into" ])
    expect(disguised).toBe("I ~ ~ a conversation with an interesting man on the train")
  })

  it("handles 'The raider fell on the policeman.'", () => {
    const disguised = vm.concealWords("The raider fell on the policeman.", [ "fall", "on" ])
    expect(disguised).toBe("The raider ~ ~ the policeman.")
  })

  it("handles 'The children fell on the food and ate it greedily.'", () => {
    const disguised = vm.concealWords("The children fell on the food and ate it greedily.", [ "fall", "on" ])
    expect(disguised).toBe("The children ~ ~ the food and ate it greedily.")
  })

  it("handles 'She fell out with him because he came home late'", () => {
    const disguised = vm.concealWords("She fell out with him because he came home late", [ "fall", "out", "with" ])
    expect(disguised).toBe("She ~ ~ ~ him because he came home late")
  })

  it("handles 'Our plans fell through due to lack of money'", () => {
    const disguised = vm.concealWords("Our plans fell through due to lack of money", [ "fall", "through" ])
    expect(disguised).toBe("Our plans ~ ~ due to lack of money")
  })

  it("handles 'Her screams drew passers-by to the scene'", () => {
    const disguised = vm.concealWords("Her screams drew passers-by to the scene", [ "draw", "drew", "drawn" ])
    expect(disguised).toBe("Her screams ~ passers-by to the scene")
  })

  it("handles 'Plenty of students continue to be drawn to the intellectual thrill of linguistic field work'", () => {
    const disguised = vm.concealWords("Plenty of students continue to be drawn to the intellectual thrill of linguistic field work", [ "draw", "drew", "drawn" ])
    expect(disguised).toBe("Plenty of students continue to be ~ to the intellectual thrill of linguistic field work")
  })

  it("handles 'Nurses often have to contend with violent or drunken patients'", () => {
    const disguised = vm.concealWords("Nurses often have to contend with violent or drunken patients", [ "contend", "with", "sth", "sb" ])
    expect(disguised).toBe("Nurses often have to ~ ~ violent or drunken patients")
  })

  it("handles 'The seeds will swell when immersed in water'", () => {
    const disguised = vm.concealWords("The seeds will swell when immersed in water", [ "immersion", "immerse" ])
    expect(disguised).toBe("The seeds will swell when ~ed in water")
  })

  it("handles 'She immersed herself in her work'", () => {
    const disguised = vm.concealWords("She immersed herself in her work", [ "immersion", "immerse" ])
    expect(disguised).toBe("She ~ed herself in her work")
  })

  it("handles 'Clare and Phil were immersed in conversation in the corner'", () => {
    const disguised = vm.concealWords("Clare and Phil were immersed in conversation in the corner", [ "immersion", "immerse" ])
    expect(disguised).toBe("Clare and Phil were ~ed in conversation in the corner")
  })

  it("handles 'She had been mugged in the street in broad daylight'", () => {
    const disguised = vm.concealWords("She had been mugged in the street in broad daylight", [ "mug" ])
    expect(disguised).toBe("She had been ~ed in the street in broad daylight")
  })

  it("handles 'The brutality of the crime has appalled the public'", () => {
    const disguised = vm.concealWords("The brutality of the crime has appalled the public", [ "appal", "horrify", "appalled", "appalling" ])
    expect(disguised).toBe("The brutality of the crime has ~ed the public")
  })

  it("handles 'The idea of sharing a room appalled her'", () => {
    const disguised = vm.concealWords("The idea of sharing a room appalled her", [ "appal", "horrify", "appalled", "appalling" ])
    expect(disguised).toBe("The idea of sharing a room ~ed her")
  })

  it("handles 'It appalled me that they could simply ignore the problem'", () => {
    const disguised = vm.concealWords("It appalled me that they could simply ignore the problem", [ "appal", "horrify", "appalled", "appalling" ])
    expect(disguised).toBe("It ~ed me that they could simply ignore the problem")
  })

  it("handles 'Viewers were appalled to hear that the reality show is to be axed'", () => {
    const disguised = vm.concealWords("Viewers were appalled to hear that the reality show is to be axed", [ "appal", "horrify", "appalled", "appalling" ])
    expect(disguised).toBe("Viewers were ~ed to hear that the reality show is to be axed")
  })

  it("handles 'An appalled expression/silence'", () => {
    const disguised = vm.concealWords("An appalled expression/silence", [ "appal", "horrify", "appalled", "appalling" ])
    expect(disguised).toBe("An ~ed expression/silence")
  })

  it("handles 'We watched appalled as the child ran in front of the car'", () => {
    const disguised = vm.concealWords("We watched appalled as the child ran in front of the car", [ "appal", "horrify", "appalled", "appalling" ])
    expect(disguised).toBe("We watched ~ed as the child ran in front of the car")
  })

  it("handles 'They were appalled at the waste of recyclable material'", () => {
    const disguised = vm.concealWords("They were appalled at the waste of recyclable material", [ "appal", "horrify", "appalled", "appalling" ])
    expect(disguised).toBe("They were ~ed at the waste of recyclable material")
  })

  it("handles 'Perspiration dampened her face and neck'", () => {
    const disguised = vm.concealWords("Perspiration dampened her face and neck", [ "damp", "dampen" ])
    expect(disguised).toBe("Perspiration ~ed her face and neck")
  })

  it("handles 'He dampened his hair to make it lie flat'", () => {
    const disguised = vm.concealWords("He dampened his hair to make it lie flat", [ "damp", "dampen" ])
    expect(disguised).toBe("He ~ed his hair to make it lie flat")
  })

  it("handles 'You have to book seats in a ticket office.'", () => {
    const disguised = vm.concealWords("You have to book seats in a ticket office.", [ "to", "book", "seats" ])
    expect(disguised).toBe("You have ~ ~ ~ in a ticket office.")
  })

  it("handles 'We always book seats in first class, the tickets are not expensive because I travel half-fare.'", () => {
    const disguised = vm.concealWords("We always book seats in first class, the tickets are not expensive because I travel half-fare.", [ "to", "travel", "half-fare" ])
    expect(disguised).toBe("We always book seats in first class, the tickets are not expensive because I ~ ~.")
  })

  it("handles 'I just look over brochures.'", () => {
    const disguised = vm.concealWords("I just look over brochures.", [ "look", "over" ])
    expect(disguised).toBe("I just ~ ~ brochures.")
  })

  it("handles 'At the station I brings a luggage trolley and put our heavy suitcases on it.'", () => {
    const disguised = vm.concealWords("At the station I brings a luggage trolley and put our heavy suitcases on it.", [ "luggage", "trolley" ])
    expect(disguised).toBe("At the station I brings a ~ ~ and put our heavy suitcases on it.")
  })

  it("handles 'In the train I always taking seats by the window, and put my luggage on the rack.'", () => {
    const disguised = vm.concealWords("In the train I always taking seats by the window, and put my luggage on the rack.", [ "take", "sb's", "seats" ])
    expect(disguised).toBe("In the train I always ~ing ~ by the window, and put ~ luggage on the rack.")
  })

  it("handles 'In the train I always taking seats by the window, and put my suits on the luggage rack.'", () => {
    const disguised = vm.concealWords("In the train I always taking seats by the window, and put my suits on the luggage rack.", [ "luggage", "rack" ])
    expect(disguised).toBe("In the train I always taking seats by the window, and put my suits on the ~ ~.")
  })

  it("handles 'What exactly does the price include? return fare, accommodation, full board and some guided sight-seeing tours.'", () => {
    const disguised = vm.concealWords("What exactly does the price include? return fare, accommodation, full board and some guided sight-seeing tours.", [ "full", "board" ])
    expect(disguised).toBe("What exactly does the price include? return fare, accommodation, ~ ~ and some guided sight-seeing tours.")
  })

  it("handles 'You can pay one hundred dollars per person and we shall hold the reservation for you. But you will have to make up your mind quickly because New York is one the most popular destinations and we may soon be fully booked.'", () => {
    const disguised = vm.concealWords("You can pay one hundred dollars per person and we shall hold the reservation for you. But you will have to make up your mind quickly because New York is one the most popular destinations and we may soon be fully booked.", [ "make", "up", "your", "mind" ])
    expect(disguised).toBe("You can pay one hundred dollars per person and we shall hold the reservation for you. But you will have to ~ ~ ~ ~ quickly because New York is one the most popular destinations and we may soon be fully booked.")
  })

  it("handles 'Have you made up your minds where to go for your honeymoon?'", () => {
    const disguised = vm.concealWords("Have you made up your minds where to go for your honeymoon?", [ "make", "up", "your", "mind" ])
    expect(disguised).toBe("Have you ~ ~ ~ ~s where to go for ~ honeymoon?")
  })

  it("handles 'Promise not to give away my secret.'", () => {
    const disguised = vm.concealWords("Promise not to give away my secret.", [ "give", "away" ])
    expect(disguised).toBe("Promise not to ~ ~ my secret.")
  })

  it("handles 'She gave away most of her clothes to the poor.'", () => {
    const disguised = vm.concealWords("She gave away most of her clothes to the poor.", [ "give", "away" ])
    expect(disguised).toBe("She ~ ~ most of her clothes to the poor.")
  })

  it("handles 'Give me back the money or I'll sue you.'", () => {
    const disguised = vm.concealWords("Give me back the money or I'll sue you.", [ "give", "back" ])
    expect(disguised).toBe("~ me ~ the money or I'll sue you.")
  })

  it("handles 'He finally gave in and admitted he was wrong'", () => {
    const disguised = vm.concealWords("He finally gave in and admitted he was wrong", [ "give", "in" ])
    expect(disguised).toBe("He finally ~ ~ and admitted he was wrong")
  })

  it("handles 'The radiators give off lots of heat.'", () => {
    const disguised = vm.concealWords("The radiators give off lots of heat.", [ "give", "off" ])
    expect(disguised).toBe("The radiators ~ ~ lots of heat.")
  })

  it("handles 'Their supplies gave out halfway through the climb.'", () => {
    const disguised = vm.concealWords("Their supplies gave out halfway through the climb.", [ "give", "out" ])
    expect(disguised).toBe("Their supplies ~ ~ halfway through the climb.")
  })

  it("handles 'They were giving out free samples of the new shampoo at the supermarket.'", () => {
    const disguised = vm.concealWords("They were giving out free samples of the new shampoo at the supermarket.", [ "give", "out" ])
    expect(disguised).toBe("They were ~ing ~ free samples of the new shampoo at the supermarket.")
  })

  it("handles 'He gave up smoking last year and hasn't smoked since.'", () => {
    const disguised = vm.concealWords("He gave up smoking last year and hasn't smoked since.", [ "give", "up" ])
    expect(disguised).toBe("He ~ ~ smoking last year and hasn't smoked since.")
  })

  it("handles 'The thieves gave themselves up to the police.'", () => {
    const disguised = vm.concealWords("The thieves gave themselves up to the police.", [ "give", "up" ])
    expect(disguised).toBe("The thieves ~ themselves ~ to the police.")
  })

  it("handles 'The teacher got his message across by using diagrams and photographs.'", () => {
    const disguised = vm.concealWords("The teacher got his message across by using diagrams and photographs.", [ "get", "across" ])
    expect(disguised).toBe("The teacher ~ his message ~ by using diagrams and photographs.")
  })

  it("handles 'She is getting along fine despite all her problems.'", () => {
    const disguised = vm.concealWords("She is getting along fine despite all her problems.", [ "get", "along" ])
    expect(disguised).toBe("She is ~ing ~ fine despite all her problems.")
  })

  it("handles 'They get along with each other despite their differences.'", () => {
    const disguised = vm.concealWords("They get along with each other despite their differences.", [ "get", "along", "with" ])
    expect(disguised).toBe("They ~ ~ ~ each other despite their differences.")
  })

  it("handles 'I don't know what you're getting at by saying such things.'", () => {
    const disguised = vm.concealWords("I don't know what you're getting at by saying such things.", [ "get", "at" ])
    expect(disguised).toBe("I don't know what you're ~ing ~ by saying such things.")
  })

  it("handles 'I can't get this steak. It's very tough.'", () => {
    const disguised = vm.concealWords("I can't get this steak. It's very tough.", [ "get", "down" ])
    expect(disguised).toBe("I can't ~ this steak. It's very tough.")
  })

  it("handles 'The rainy weather gets me down.'", () => {
    const disguised = vm.concealWords("The rainy weather gets me down.", [ "get", "down" ])
    expect(disguised).toBe("The rainy weather ~s me ~.")
  })

  it("handles 'It's time you got down to looking for a better job.'", () => {
    const disguised = vm.concealWords("It's time you got down to looking for a better job.", [ "get", "down", "to" ])
    expect(disguised).toBe("It's time you ~ ~ ~ looking for a better job.")
  })

  it("handles 'Get on the bus before it starts.'", () => {
    const disguised = vm.concealWords("Get on the bus before it starts.", [ "get", "on" ])
    expect(disguised).toBe("~ ~ the bus before it starts.")
  })

  it("handles 'he's getting on well at school.'", () => {
    const disguised = vm.concealWords("he's getting on well at school.", [ "get", "on" ])
    expect(disguised).toBe("he's ~ing ~ well at school.")
  })

  it("handles 'She gets on well with her friend Lucy.'", () => {
    const disguised = vm.concealWords("She gets on well with her friend Lucy.", [ "get", "on", "with", "sb" ])
    expect(disguised).toBe("She ~s ~ well ~ her friend Lucy.")
  })

  it("handles 'How did the news of his promotion get out?'", () => {
    const disguised = vm.concealWords("How did the news of his promotion get out?", [ "get", "out" ])
    expect(disguised).toBe("How did the news of his promotion ~ ~?")
  })

  it("handles 'He is trying hard to get over the death of his wife.'", () => {
    const disguised = vm.concealWords("He is trying hard to get over the death of his wife.", [ "get", "over" ])
    expect(disguised).toBe("He is trying hard to ~ ~ the death of his wife.")
  })

  it("handles 'We eventually got him round to our point of view.'", () => {
    const disguised = vm.concealWords("We eventually got him round to our point of view.", [ "get", "round" ])
    expect(disguised).toBe("We eventually ~ him ~ to our point of view.")
  })

  it("handles 'I haven't got round to writing that letter yet.'", () => {
    const disguised = vm.concealWords("I haven't got round to writing that letter yet.", [ "get", "round", "to" ])
    expect(disguised).toBe("I haven't ~ ~ ~ writing that letter yet.")
  })

  it("handles 'I meant to do the ironing but I didn't get round to it.'", () => {
    const disguised = vm.concealWords("I meant to do the ironing but I didn't get round to it.", [ "get", "round", "to" ])
    expect(disguised).toBe("I meant ~ do the ironing but I didn't ~ ~ ~ it.")
  })

  it("handles 'I've got to get through this chapter before I go out.'", () => {
    const disguised = vm.concealWords("I've got to get through this chapter before I go out.", [ "get", "through" ])
    expect(disguised).toBe("I've ~ to ~ ~ this chapter before I go out.")
  })

  it("handles 'How can old people get through the cold winters.'", () => {
    const disguised = vm.concealWords("How can old people get through the cold winters.", [ "get", "through" ])
    expect(disguised).toBe("How can old people ~ ~ the cold winters.")
  })

  it("handles 'Did you get through your dentist or will you call him later?'", () => {
    const disguised = vm.concealWords("Did you get through your dentist or will you call him later?", [ "get", "through", "to" ])
    expect(disguised).toBe("Did you ~ ~ your dentist or will you call him later?")
  })

  it("handles 'What time did you get up today?'", () => {
    const disguised = vm.concealWords("What time did you get up today?", [ "get", "up" ])
    expect(disguised).toBe("What time did you ~ ~ today?")
  })

  it("handles 'Please check in at least an hour before departure.'", () => {
    const disguised = vm.concealWords("Please check in at least an hour before departure.", [ "check", "in" ])
    expect(disguised).toBe("Please ~ ~ at least an hour before departure.")
  })

  it("handles 'Guests should check out of their rooms by noon.'", () => {
    const disguised = vm.concealWords("Guests should check out of their rooms by noon.", [ "check", "out" ])
    expect(disguised).toBe("Guests should ~ ~ of their rooms by noon.")
  })

  it("handles 'Life did not deal kindly with him. He had difficult childhood.'", () => {
    const disguised = vm.concealWords("Life did not deal kindly with him. He had difficult childhood.", [ "to", "deal", "kindly", "with", "sb" ])
    expect(disguised).toBe("Life did not ~ ~ ~ him. He had difficult childhood.")
  })

  it("handles 'Armstrong stepfather was a despot and left them when he was 5. His mother did not get any support from her family so it was difficult for them to make ends meet.'", () => {
    const disguised = vm.concealWords("Armstrong stepfather was a despot and left them when he was 5. His mother did not get any support from her family so it was difficult for them to make ends meet.", [ "to", "make", "ends", "meet" ])
    expect(disguised).toBe("Armstrong stepfather was a despot and left them when he was 5. His mother did not get any support from her family so it was difficult for them ~ ~ ~ ~.")
  })

  it("handles 'Armstrong was always a high-flier. It was like in the case of many sportsmen from the lower classes who had to struggle hard for success - Armstrong is so determined that he does not let a victory slip through his fingers.'", () => {
    const disguised = vm.concealWords("Armstrong was always a high-flier. It was like in the case of many sportsmen from the lower classes who had to struggle hard for success - Armstrong is so determined that he does not let a victory slip through his fingers.", [ "to", "slip", "through", "one's", "finger" ])
    expect(disguised).toBe("Armstrong was always a high-flier. It was like in the case of many sportsmen from the lower classes who had ~ struggle hard for success - Armstrong is so determined that he does not let a victory ~ ~ ~ ~s.")
  })

  it("handles 'Financial problems are plaguing the company'", () => {
    const disguised = vm.concealWords("Financial problems are plaguing the company", [ "plague" ])
    expect(disguised).toBe("Financial problems are ~ing the company")
  })

  it("handles 'His performance stood head and shoulders above the rest.'", () => {
    const disguised = vm.concealWords("His performance stood head and shoulders above the rest.", [ "be", "head", "and", "shoulders", "above", "somebody", "something" ])
    expect(disguised).toBe("His performance stood ~ ~ ~ ~ the rest.")
  })

  it("handles 'We aim to help you move house with minimum disruption to yourself'", () => {
    const disguised = vm.concealWords("We aim to help you move house with minimum disruption to yourself", [ "disrupt", "disruption", "disruptive" ])
    expect(disguised).toBe("We aim to help you move house with minimum ~ to yourself")
  })

  it("handles 'The law of disruption'", () => {
    const disguised = vm.concealWords("The law of disruption", [ "disrupt", "disruption", "disruptive" ])
    expect(disguised).toBe("The law of ~")
  })

  it("handles 'She had a disruptive influence on the rest of the class'", () => {
    const disguised = vm.concealWords("She had a disruptive influence on the rest of the class", [ "disrupt", "disruption", "disruptive" ])
    expect(disguised).toBe("She had a ~ influence on the rest of the class")
  })

  it("handles 'When the amount of grassland has fallen and pollen counts have gradually dropped, the amount of people with hay fever has risen steeply'", () => {
    const disguised = vm.concealWords("When the amount of grassland has fallen and pollen counts have gradually dropped, the amount of people with hay fever has risen steeply", [ "steep", "sharp", "steeply" ])
    expect(disguised).toBe("When the amount of grassland has fallen and pollen counts have gradually dropped, the amount of people with hay fever has risen ~ly")
  })

  it("handles 'After that, things started to go haywire'", () => {
    const disguised = vm.concealWords("After that, things started to go haywire", [ "go", "haywire" ])
    expect(disguised).toBe("After that, things started to ~ ~")
  })

  it("handles 'When your body goes haywire'", () => {
    const disguised = vm.concealWords("When your body goes haywire", [ "go", "haywire" ])
    expect(disguised).toBe("When your body ~s ~")
  })

  it("handles 'The crew acted courageously in staying with the ship until all the passengers had been taken to safety'", () => {
    const disguised = vm.concealWords("The crew acted courageously in staying with the ship until all the passengers had been taken to safety", [ "courageous", "brave", "plucky", "cowardly", "courageously" ])
    expect(disguised).toBe("The crew acted ~ly in staying with the ship until all the passengers had been taken to safety")
  })

  it("handles 'The stables have been imaginatively converted into offices'", () => {
    const disguised = vm.concealWords("The stables have been imaginatively converted into offices", [ "imaginative", "imaginatively", "unimaginative", "inventive" ])
    expect(disguised).toBe("The stables have been ~ly converted into offices")
  })

  it("handles 'I am reliably informed (= told by somebody who knows the facts) that the company is being sold'", () => {
    const disguised = vm.concealWords("I am reliably informed (= told by somebody who knows the facts) that the company is being sold", [ "reliable", "dependable", "reliably", "reliability" ])
    expect(disguised).toBe("I am ~ informed (= told by somebody who knows the facts) that the company is being sold")
  })

  it("handles 'The incident cast doubt on her motives and reliability'", () => {
    const disguised = vm.concealWords("The incident cast doubt on her motives and reliability", [ "reliable", "dependable", "reliably", "reliability" ])
    expect(disguised).toBe("The incident cast doubt on her motives and ~")
  })

  it("handles 'The reliability of these results has been questioned'", () => {
    const disguised = vm.concealWords("The reliability of these results has been questioned", [ "reliable", "dependable", "reliably", "reliability" ])
    expect(disguised).toBe("The ~ of these results has been questioned")
  })

  it("handles 'The aircraft has an exceptional record of reliability'", () => {
    const disguised = vm.concealWords("The aircraft has an exceptional record of reliability", [ "reliable", "dependable", "reliably", "reliability" ])
    expect(disguised).toBe("The aircraft has an exceptional record of ~")
  })

  it("handles 'I was stung on the arm by a wasp'", () => {
    const disguised = vm.concealWords("I was stung on the arm by a wasp", [ "sting", "stung" ])
    expect(disguised).toBe("I was ~ on the arm by a wasp")
  })

  it("handles 'I put some antiseptic on the cut and it stung for a moment'", () => {
    const disguised = vm.concealWords("I put some antiseptic on the cut and it stung for a moment", [ "sting", "stung" ])
    expect(disguised).toBe("I put some antiseptic on the cut and it ~ for a moment")
  })

  it("handles 'He was stung by their criticism'", () => {
    const disguised = vm.concealWords("He was stung by their criticism", [ "sting", "stung" ])
    expect(disguised).toBe("He was ~ by their criticism")
  })

  it("handles 'Their cruel remarks stung her into action'", () => {
    const disguised = vm.concealWords("Their cruel remarks stung her into action", [ "sting", "stung" ])
    expect(disguised).toBe("Their cruel remarks ~ her into action")
  })

  it("handles 'He was stung into answering in his defence'", () => {
    const disguised = vm.concealWords("He was stung into answering in his defence", [ "sting", "stung" ])
    expect(disguised).toBe("He was ~ into answering in his defence")
  })

  it("handles 'Ouch! You trod on my toe!'", () => {
    const disguised = vm.concealWords("Ouch! You trod on my toe!", [ "tread", "trod", "trodden" ])
    expect(disguised).toBe("Ouch! You ~ on my toe!")
  })

  it("handles 'She tried to hold back her tears and not cry in front of her mum.'", () => {
    const disguised = vm.concealWords("She tried to hold back her tears and not cry in front of her mum.", [ "hold", "back" ])
    expect(disguised).toBe("She tried to ~ ~ her tears and not cry in front of her mum.")
  })

  it("handles 'He bravely held back his tears.'", () => {
    const disguised = vm.concealWords("He bravely held back his tears.", [ "hold", "back" ])
    expect(disguised).toBe("He bravely ~ ~ his tears.")
  })

  it("handles 'She just managed to hold back her anger.'", () => {
    const disguised = vm.concealWords("She just managed to hold back her anger.", [ "hold", "back" ])
    expect(disguised).toBe("She just managed to ~ ~ her anger.")
  })

  it("handles 'She held back, not knowing how to break the terrible news.'", () => {
    const disguised = vm.concealWords("She held back, not knowing how to break the terrible news.", [ "hold", "back" ])
    expect(disguised).toBe("She ~ ~, not knowing how to break the terrible news.")
  })

  it("handles 'He held his anger in and didn't shout at the boy.'", () => {
    const disguised = vm.concealWords("He held his anger in and didn't shout at the boy.", [ "hold", "in" ])
    expect(disguised).toBe("He ~ his anger ~ and didn't shout at the boy.")
  })

  it("handles 'to hold in your feelings/anger'", () => {
    const disguised = vm.concealWords("to hold in your feelings/anger", [ "hold", "in" ])
    expect(disguised).toBe("to ~ ~ your feelings/anger")
  })

  it("handles 'The police held off the crowd until the troops arrived'", () => {
    const disguised = vm.concealWords("The police held off the crowd until the troops arrived", [ "hold", "off" ])
    expect(disguised).toBe("The police ~ ~ the crowd until the troops arrived")
  })

  it("handles 'The rain held off just long enough for us to have our picnic.'", () => {
    const disguised = vm.concealWords("The rain held off just long enough for us to have our picnic.", [ "hold", "off" ])
    expect(disguised).toBe("The rain ~ ~ just long enough for us to have our picnic.")
  })

  it("handles 'Please hold on; Mr. Monday is on the other line.'", () => {
    const disguised = vm.concealWords("Please hold on; Mr. Monday is on the other line.", [ "hold", "on" ])
    expect(disguised).toBe("Please ~ ~; Mr. Monday is ~ the other line.")
  })

  it("handles 'The food supplies won't hold out until Monday so we'll have to find some food before then.'", () => {
    const disguised = vm.concealWords("The food supplies won't hold out until Monday so we'll have to find some food before then.", [ "hold", "out" ])
    expect(disguised).toBe("The food supplies won't ~ ~ until Monday so we'll have to find some food before then.")
  })

  it("handles 'We can stay here for as long as our supplies hold out.'", () => {
    const disguised = vm.concealWords("We can stay here for as long as our supplies hold out.", [ "hold", "out" ])
    expect(disguised).toBe("We can stay here for as long as our supplies ~ ~.")
  })

  it("handles 'The miners held out for 18 months before they called off the strike.'", () => {
    const disguised = vm.concealWords("The miners held out for 18 months before they called off the strike.", [ "hold", "out" ])
    expect(disguised).toBe("The miners ~ ~ for 18 months before they called off the strike.")
  })

  it("handles 'The rebels held out in the mountains for several years.'", () => {
    const disguised = vm.concealWords("The rebels held out in the mountains for several years.", [ "hold", "out" ])
    expect(disguised).toBe("The rebels ~ ~ in the mountains for several years.")
  })

  it("handles 'Whatever you say, I'll hold to my opinion.'", () => {
    const disguised = vm.concealWords("Whatever you say, I'll hold to my opinion.", [ "hold", "to" ])
    expect(disguised).toBe("Whatever you say, I'll ~ ~ my opinion.")
  })

  it("handles 'An accident is holding up traffic.'", () => {
    const disguised = vm.concealWords("An accident is holding up traffic.", [ "hold", "up" ])
    expect(disguised).toBe("An accident is ~ing ~ traffic.")
  })

  it("handles 'My application was held up by the postal strike.'", () => {
    const disguised = vm.concealWords("My application was held up by the postal strike.", [ "hold", "up" ])
    expect(disguised).toBe("My application was ~ ~ by the postal strike.")
  })

  it("handles 'Masked men held up a security van in South London yesterday.'", () => {
    const disguised = vm.concealWords("Masked men held up a security van in South London yesterday.", [ "hold", "up" ])
    expect(disguised).toBe("Masked men ~ ~ a security van in South London yesterday.")
  })

  it("handles 'The robbers held up the train and stole 220000 dollars.'", () => {
    const disguised = vm.concealWords("The robbers held up the train and stole 220000 dollars.", [ "hold", "up" ])
    expect(disguised).toBe("The robbers ~ ~ the train and stole 220000 dollars.")
  })

  it("handles 'We spent a happy evening reminiscing about the past'", () => {
    const disguised = vm.concealWords("We spent a happy evening reminiscing about the past", [ "reminisce" ])
    expect(disguised).toBe("We spent a happy evening ~ing about the past")
  })

  it("handles 'He got the sack for swearing'", () => {
    const disguised = vm.concealWords("He got the sack for swearing", [ "the", "sack" ])
    expect(disguised).toBe("He got ~ ~ for swearing")
  })

  it("handles 'Her work was so poor that she was given the sack'", () => {
    const disguised = vm.concealWords("Her work was so poor that she was given the sack", [ "the", "sack" ])
    expect(disguised).toBe("Her work was so poor that she was given ~ ~")
  })

  it("handles 'Four hundred workers face the sack'", () => {
    const disguised = vm.concealWords("Four hundred workers face the sack", [ "the", "sack" ])
    expect(disguised).toBe("Four hundred workers face ~ ~")
  })

  it("handles 'I grasped the opportunity to work abroad'", () => {
    const disguised = vm.concealWords("I grasped the opportunity to work abroad", [ "grasp", "a", "chance", "an", "opportunity" ])
    expect(disguised).toBe("I ~ed the ~ to work abroad")
  })

  it("handles 'The government now has the opportunity to grasp the nettle of prison reform'", () => {
    const disguised = vm.concealWords("The government now has the opportunity to grasp the nettle of prison reform", [ "grasp", "the", "nettle" ])
    expect(disguised).toBe("~ government now has ~ opportunity to ~ ~ ~ of prison reform")
  })

  it("handles 'She grasped at his coat as he rushed past her'", () => {
    const disguised = vm.concealWords("She grasped at his coat as he rushed past her", [ "grasp", "at", "sth" ])
    expect(disguised).toBe("She ~ed ~ his coat as he rushed past her")
  })

  it("handles 'smuggled drugs'", () => {
    const disguised = vm.concealWords("smuggled drugs", [ "to", "smuggle" ])
    expect(disguised).toBe("~ed drugs")
  })

  it("handles 'They were caught smuggling diamonds into the country.'", () => {
    const disguised = vm.concealWords("They were caught smuggling diamonds into the country.", [ "to", "smuggle" ])
    expect(disguised).toBe("They were caught ~ing diamonds into the country.")
  })

  it("handles 'Completed projects must be submitted by 10 March.'", () => {
    const disguised = vm.concealWords("Completed projects must be submitted by 10 March.", [ "submit" ])
    expect(disguised).toBe("Completed projects must be ~ed by 10 March.")
  })

  it("handles 'He went after the burglars.'", () => {
    const disguised = vm.concealWords("He went after the burglars.", [ "go", "after" ])
    expect(disguised).toBe("He ~ ~ the burglars.")
  })

  it("handles 'She left the room in tears so I went after her.'", () => {
    const disguised = vm.concealWords("She left the room in tears so I went after her.", [ "go", "after" ])
    expect(disguised).toBe("She left the room in tears so I ~ ~ her.")
  })

  it("handles 'Although several members were absent, the board meeting went ahead as planned.'", () => {
    const disguised = vm.concealWords("Although several members were absent, the board meeting went ahead as planned.", [ "go", "ahead" ])
    expect(disguised).toBe("Although several members were absent, the board meeting ~ ~ as planned.")
  })

  it("handles 'The building of the new bridge will go ahead as planned.'", () => {
    const disguised = vm.concealWords("The building of the new bridge will go ahead as planned.", [ "go", "ahead" ])
    expect(disguised).toBe("The building of the new bridge will ~ ~ as planned.")
  })

  it("handles 'If you take an aspirin, your headache will go away.'", () => {
    const disguised = vm.concealWords("If you take an aspirin, your headache will go away.", [ "go", "away" ])
    expect(disguised).toBe("If you take an aspirin, your headache will ~ ~.")
  })

  it("handles 'Although he had promised to help us, he went back on his word.'", () => {
    const disguised = vm.concealWords("Although he had promised to help us, he went back on his word.", [ "go", "back", "on" ])
    expect(disguised).toBe("Although he had promised to help us, he ~ ~ ~ his word.")
  })

  it("handles 'You shouldn't go by what he says - he always exaggerates (przesadza)'", () => {
    const disguised = vm.concealWords("You shouldn't go by what he says - he always exaggerates (przesadza)", [ "go", "by" ])
    expect(disguised).toBe("You shouldn't ~ ~ what he says - he always exaggerates (przesadza)")
  })

  it("handles 'He has gone down with the flu.'", () => {
    const disguised = vm.concealWords("He has gone down with the flu.", [ "go", "down", "with" ])
    expect(disguised).toBe("He has ~ ~ ~ the flu.")
  })

  it("handles 'Our youngest boy has gone down with chickenpox.'", () => {
    const disguised = vm.concealWords("Our youngest boy has gone down with chickenpox.", [ "go", "down", "with" ])
    expect(disguised).toBe("Our youngest boy has ~ ~ ~ chickenpox.")
  })

  it("handles 'A big Alsatian went for my little dog.'", () => {
    const disguised = vm.concealWords("A big Alsatian went for my little dog.", [ "go", "for" ])
    expect(disguised).toBe("A big Alsatian ~ ~ my little dog.")
  })

  it("handles 'Why don't you go for this marketing job? You may get it.'", () => {
    const disguised = vm.concealWords("Why don't you go for this marketing job? You may get it.", [ "go", "for" ])
    expect(disguised).toBe("Why don't you ~ ~ this marketing job? You may get it.")
  })

  it("handles 'Alternating dark and pale stripes'", () => {
    const disguised = vm.concealWords("Alternating dark and pale stripes", [ "alternate", "alternation", "alternately" ])
    expect(disguised).toBe("~ing dark and pale stripes")
  })

  it("handles 'He felt alternately hot and cold'", () => {
    const disguised = vm.concealWords("He felt alternately hot and cold", [ "alternate", "alternation", "alternately" ])
    expect(disguised).toBe("He felt ~ly hot and cold")
  })

  it("handles 'She worked off her anger by going for a walk'", () => {
    const disguised = vm.concealWords("She worked off her anger by going for a walk", [ "work", "sth", "off" ])
    expect(disguised).toBe("She ~ed ~ her anger by going for a walk")
  })

  it("handles 'Burning calories and working off the fat will help you look and feel better'", () => {
    const disguised = vm.concealWords("Burning calories and working off the fat will help you look and feel better", [ "work", "sth", "off" ])
    expect(disguised).toBe("Burning calories and ~ing ~ the fat will help you look and feel better")
  })

  it("handles 'They had a large bank loan to work off'", () => {
    const disguised = vm.concealWords("They had a large bank loan to work off", [ "work", "sth", "off" ])
    expect(disguised).toBe("They had a large bank loan to ~ ~")
  })

  it("handles 'The music worked up to a rousing finale'", () => {
    const disguised = vm.concealWords("The music worked up to a rousing finale", [ "work", "up", "to", "sth" ])
    expect(disguised).toBe("The music ~ed ~ ~ a rousing finale")
  })

  it("handles 'I began by jogging in the park and worked up to running five miles a day'", () => {
    const disguised = vm.concealWords("I began by jogging in the park and worked up to running five miles a day", [ "work", "up", "to", "sth" ])
    expect(disguised).toBe("I began by jogging in the park and ~ed ~ ~ running five miles a day")
  })

  it("handles 'Recent studies have shown that it's best to begin slowly and gradually work up to 30 minutes of exercise'", () => {
    const disguised = vm.concealWords("Recent studies have shown that it's best to begin slowly and gradually work up to 30 minutes of exercise", [ "work", "up", "to", "sth" ])
    expect(disguised).toBe("Recent studies have shown that it's best ~ begin slowly and gradually ~ ~ ~ 30 minutes of exercise")
  })

  it("handles 'A debilitating disease'", () => {
    const disguised = vm.concealWords("A debilitating disease", [ "debilitate" ])
    expect(disguised).toBe("A ~ing disease")
  })

  it("handles 'She found the heat debilitating'", () => {
    const disguised = vm.concealWords("She found the heat debilitating", [ "debilitate" ])
    expect(disguised).toBe("She found the heat ~ing")
  })

  it("handles 'The economy is now strengthening after a long and debilitating recession'", () => {
    const disguised = vm.concealWords("The economy is now strengthening after a long and debilitating recession", [ "debilitate" ])
    expect(disguised).toBe("The economy is now strengthening after a long and ~ing recession")
  })

  it("handles 'He's getting on very well at school'", () => {
    const disguised = vm.concealWords("He's getting on very well at school", [ "get", "on", "along" ])
    expect(disguised).toBe("He's ~ing ~ very well at school")
  })

  it("handles 'How did you get on at the interview?'", () => {
    const disguised = vm.concealWords("How did you get on at the interview?", [ "get", "on", "along" ])
    expect(disguised).toBe("How did you ~ ~ at the interview?")
  })

  it("handles 'Parents are always anxious for their children to get on'", () => {
    const disguised = vm.concealWords("Parents are always anxious for their children to get on", [ "get", "on" ])
    expect(disguised).toBe("Parents are always anxious for their children to ~ ~")
  })

  it("handles 'I don't know how he's going to get on in life'", () => {
    const disguised = vm.concealWords("I don't know how he's going to get on in life", [ "get", "on" ])
    expect(disguised).toBe("I don't know how he's going to ~ ~ in life")
  })

  it("handles 'We can get on perfectly well without her'", () => {
    const disguised = vm.concealWords("We can get on perfectly well without her", [ "get", "on", "along" ])
    expect(disguised).toBe("We can ~ ~ perfectly well without her")
  })

  it("handles 'I just can't get along without a secretary'", () => {
    const disguised = vm.concealWords("I just can't get along without a secretary", [ "get", "on", "along" ])
    expect(disguised).toBe("I just can't ~ ~ without a secretary")
  })

  it("handles 'Our future prosperity depends on economic growth'", () => {
    const disguised = vm.concealWords("Our future prosperity depends on economic growth", [ "prosper", "thrive", "prosperity", "prosperous" ])
    expect(disguised).toBe("Our future ~ depends on economic growth")
  })

  it("handles 'The country is enjoying a period of peace and prosperity'", () => {
    const disguised = vm.concealWords("The country is enjoying a period of peace and prosperity", [ "prosper", "thrive", "prosperity", "prosperous" ])
    expect(disguised).toBe("The country is enjoying a period of peace and ~")
  })

  it("handles 'The 1950s were an age of affluence in America'", () => {
    const disguised = vm.concealWords("The 1950s were an age of affluence in America", [ "affluent", "wealthy", "prosperous", "affluence" ])
    expect(disguised).toBe("The 1950s were an age of ~ in America")
  })

  it("handles 'The play flopped on Broadway'", () => {
    const disguised = vm.concealWords("The play flopped on Broadway", [ "flop" ])
    expect(disguised).toBe("The play ~ed on Broadway")
  })

  it("handles 'England flopped in the European Championship'", () => {
    const disguised = vm.concealWords("England flopped in the European Championship", [ "flop" ])
    expect(disguised).toBe("England ~ed in the European Championship")
  })

  it("handles 'She took to tennis as if she'd been playing all her life'", () => {
    const disguised = vm.concealWords("She took to tennis as if she'd been playing all her life", [ "take", "to", "sth" ])
    expect(disguised).toBe("She ~ ~ tennis as if she'd been playing all her life")
  })

  it("handles 'The jury acquitted him of murder'", () => {
    const disguised = vm.concealWords("The jury acquitted him of murder", [ "acquit", "convict" ])
    expect(disguised).toBe("The jury ~ed him of murder")
  })

  it("handles 'Both defendants were acquitted'", () => {
    const disguised = vm.concealWords("Both defendants were acquitted", [ "acquit", "convict" ])
    expect(disguised).toBe("Both defendants were ~ed")
  })

  it("handles 'She was acquitted on all charges'", () => {
    const disguised = vm.concealWords("She was acquitted on all charges", [ "acquit", "convict" ])
    expect(disguised).toBe("She was ~ed on all charges")
  })

  it("handles 'He was acquitted on the grounds of insufficient evidence'", () => {
    const disguised = vm.concealWords("He was acquitted on the grounds of insufficient evidence", [ "acquit", "convict" ])
    expect(disguised).toBe("He was ~ed on the grounds of insufficient evidence")
  })

  it("handles 'Obesity can increase the risk of heart disease'", () => {
    const disguised = vm.concealWords("Obesity can increase the risk of heart disease", [ "obese", "obesity", "overweight" ])
    expect(disguised).toBe("~ can increase the risk of heart disease")
  })

  it("handles 'Many people develop cravings for salt, sugar and fat to counteract tension and, thus, gain weight'", () => {
    const disguised = vm.concealWords("Many people develop cravings for salt, sugar and fat to counteract tension and, thus, gain weight", [ "crave", "long", "for", "craving" ])
    expect(disguised).toBe("Many people develop ~s ~ salt, sugar and fat to counteract tension and, thus, gain weight")
  })

  it("handles 'The dark clothes emphasized the leanness of her body'", () => {
    const disguised = vm.concealWords("The dark clothes emphasized the leanness of her body", [ "lean", "leanness" ])
    expect(disguised).toBe("The dark clothes emphasized the ~ of her body")
  })

  it("handles 'These ferns will grow best in a humid atmosphere'", () => {
    const disguised = vm.concealWords("These ferns will grow best in a humid atmosphere", [ "humidity", "humid" ])
    expect(disguised).toBe("These ferns will grow best in a ~ atmosphere")
  })

  it("handles 'The island is hot and humid in the summer'", () => {
    const disguised = vm.concealWords("The island is hot and humid in the summer", [ "humidity", "humid" ])
    expect(disguised).toBe("The island is hot and ~ in the summer")
  })

  it("handles 'They were not prepared for the humid heat of the tropical forest'", () => {
    const disguised = vm.concealWords("They were not prepared for the humid heat of the tropical forest", [ "humidity", "humid" ])
    expect(disguised).toBe("They were not prepared for the ~ heat of the tropical forest")
  })

  it("handles 'She nodded in affirmation'", () => {
    const disguised = vm.concealWords("She nodded in affirmation", [ "affirm", "confirm", "affirmation" ])
    expect(disguised).toBe("She nodded in ~")
  })

  it("handles 'I will be on leave during the week commencing 15 February'", () => {
    const disguised = vm.concealWords("I will be on leave during the week commencing 15 February", [ "commence" ])
    expect(disguised).toBe("I will be on leave during the week ~ing 15 February")
  })

  it("handles 'He's getting good at forging his mother's signature'", () => {
    const disguised = vm.concealWords("He's getting good at forging his mother's signature", [ "forge", "forgery", "counterfeit" ])
    expect(disguised).toBe("He's getting good at ~ing his mother's signature")
  })

  it("handles 'I called the station to enquire about train times'", () => {
    const disguised = vm.concealWords("I called the station to enquire about train times", [ "enquire", "inquire", "enquiry" ])
    expect(disguised).toBe("I called the station to ~ about train times")
  })

  it("handles 'She enquired as to your whereabouts'", () => {
    const disguised = vm.concealWords("She enquired as to your whereabouts", [ "enquire", "inquire", "enquiry" ])
    expect(disguised).toBe("She ~ed as to your whereabouts")
  })

  it("handles 'Might I enquire why you have not mentioned this until now?'", () => {
    const disguised = vm.concealWords("Might I enquire why you have not mentioned this until now?", [ "enquire", "inquire", "enquiry" ])
    expect(disguised).toBe("Might I ~ why you have not mentioned this until now?")
  })

  it("handles 'He enquired her name'", () => {
    const disguised = vm.concealWords("He enquired her name", [ "enquire", "inquire", "enquiry" ])
    expect(disguised).toBe("He ~ed her name")
  })

  it("handles ''What is your name?' he enquired'", () => {
    const disguised = vm.concealWords("'What is your name?' he enquired", [ "enquire", "inquire", "enquiry" ])
    expect(disguised).toBe("'What is your name?' he ~ed")
  })

  it("handles 'I'll have to make a few enquiries and get back to you'", () => {
    const disguised = vm.concealWords("I'll have to make a few enquiries and get back to you", [ "enquiry" ])
    expect(disguised).toBe("I'll have to make a few ~s and get back to you")
  })

  it("handles 'All enquiries should be addressed to the customer services department'", () => {
    const disguised = vm.concealWords("All enquiries should be addressed to the customer services department", [ "enquiry" ])
    expect(disguised).toBe("All ~s should be addressed to the customer services department")
  })

  it("handles 'A public enquiry into the environmental effects of the proposed new road'", () => {
    const disguised = vm.concealWords("A public enquiry into the environmental effects of the proposed new road", [ "enquiry", "inquiry" ])
    expect(disguised).toBe("A public ~ into the environmental effects of the proposed new road")
  })

  it("handles 'To hold/order an enquiry into the affair'", () => {
    const disguised = vm.concealWords("To hold/order an enquiry into the affair", [ "enquiry", "inquiry" ])
    expect(disguised).toBe("To hold/order an ~ into the affair")
  })

  it("handles 'She once understudied Marilyn Monroe'", () => {
    const disguised = vm.concealWords("She once understudied Marilyn Monroe", [ "understudy" ])
    expect(disguised).toBe("She once ~ed Marilyn Monroe")
  })

  it("handles 'We were given only two weeks to rehearse'", () => {
    const disguised = vm.concealWords("We were given only two weeks to rehearse", [ "rehearsal", "rehearse" ])
    expect(disguised).toBe("We were given only two weeks to ~")
  })

  it("handles 'Today, we'll just be rehearsing the final scene'", () => {
    const disguised = vm.concealWords("Today, we'll just be rehearsing the final scene", [ "rehearsal", "rehearse" ])
    expect(disguised).toBe("Today, we'll just be ~ing the final scene")
  })

  it("handles 'the snow crunches beneath my feet'", () => {
    const disguised = vm.concealWords("the snow crunches beneath my feet", [ "crunch" ])
    expect(disguised).toBe("the snow ~s beneath my feet")
  })

  it("handles 'the exhaust fumes that are polluting our cities'", () => {
    const disguised = vm.concealWords("the exhaust fumes that are polluting our cities", [ "pollute" ])
    expect(disguised).toBe("the exhaust fumes that are ~ing our cities")
  })

  it("handles 'From his experience gathered along the way, he concluded one thing: if nothing was going to be done people would destroy the natural beauty of that land by polluting it and killing its wild inhabitants. He was especially concerned about species like elephants which were hunted down for their tusks. He wrote an article to focus on people's attention on these problems.'", () => {
    const disguised = vm.concealWords("From his experience gathered along the way, he concluded one thing: if nothing was going to be done people would destroy the natural beauty of that land by polluting it and killing its wild inhabitants. He was especially concerned about species like elephants which were hunted down for their tusks. He wrote an article to focus on people's attention on these problems.", [ "pollute" ])
    expect(disguised).toBe("From his experience gathered along the way, he concluded one thing: if nothing was going to be done people would destroy the natural beauty of that land by ~ing it and killing its wild inhabitants. He was especially concerned about species like elephants which were hunted down for their tusks. He wrote an article to focus on people's attention on these problems.")
  })

  it("handles 'He thrives on hard work'", () => {
    const disguised = vm.concealWords("He thrives on hard work", [ "thrive", "on", "sth" ])
    expect(disguised).toBe("He ~s ~ hard work")
  })

  it("handles 'A couple of teenagers were kissing and cuddling on the doorstep'", () => {
    const disguised = vm.concealWords("A couple of teenagers were kissing and cuddling on the doorstep", [ "cuddle", "hug", "cuddly" ])
    expect(disguised).toBe("A couple of teenagers were kissing and ~ing on the doorstep")
  })

  it("handles 'The first ascent of Mount Everest'", () => {
    const disguised = vm.concealWords("The first ascent of Mount Everest", [ "descent", "ascent" ])
    expect(disguised).toBe("The first ~ of Mount Everest")
  })

  it("handles 'The cart began its gradual ascent up the hill'", () => {
    const disguised = vm.concealWords("The cart began its gradual ascent up the hill", [ "descent", "ascent" ])
    expect(disguised).toBe("The cart began its gradual ~ up the hill")
  })

  it("handles 'The rocket steepened its ascent'", () => {
    const disguised = vm.concealWords("The rocket steepened its ascent", [ "descent", "ascent" ])
    expect(disguised).toBe("The rocket steepened its ~")
  })

  it("handles 'At the other side of the valley was a steep ascent to the top of the hill'", () => {
    const disguised = vm.concealWords("At the other side of the valley was a steep ascent to the top of the hill", [ "descent", "ascent" ])
    expect(disguised).toBe("At the other side of the valley was a steep ~ to the top of the hill")
  })

  it("handles 'He was able to trace his ancestry back over 1000 years'", () => {
    const disguised = vm.concealWords("He was able to trace his ancestry back over 1000 years", [ "descent", "ancestry" ])
    expect(disguised).toBe("He was able to trace his ~ back over 1000 years")
  })

  it("handles 'She put a consoling arm around his shoulders'", () => {
    const disguised = vm.concealWords("She put a consoling arm around his shoulders", [ "console", "comfort", "consolation" ])
    expect(disguised).toBe("She put a ~ing arm around his shoulders")
  })

  it("handles 'If it's any consolation, she didn't get the job, either'", () => {
    const disguised = vm.concealWords("If it's any consolation, she didn't get the job, either", [ "console", "comfort", "consolation" ])
    expect(disguised).toBe("If it's any ~, she didn't get the job, either")
  })

  it("handles 'The children were a great consolation to him when his wife died'", () => {
    const disguised = vm.concealWords("The children were a great consolation to him when his wife died", [ "console", "comfort", "consolation" ])
    expect(disguised).toBe("The children were a great ~ to him when his wife died")
  })

  it("handles 'At least you weren't hurt - that's one consolation'", () => {
    const disguised = vm.concealWords("At least you weren't hurt - that's one consolation", [ "console", "comfort", "consolation" ])
    expect(disguised).toBe("At least you weren't hurt - that's one ~")
  })

  it("handles 'You're too intelligent to fall for his flattery'", () => {
    const disguised = vm.concealWords("You're too intelligent to fall for his flattery", [ "flatter", "flattery" ])
    expect(disguised).toBe("You're too intelligent to fall for his ~")
  })

  it("handles 'He confessed after four days under interrogation'", () => {
    const disguised = vm.concealWords("He confessed after four days under interrogation", [ "interrogation", "interrogate" ])
    expect(disguised).toBe("He confessed after four days under ~")
  })

  it("handles 'She hated her parents' endless interrogations about where she'd been'", () => {
    const disguised = vm.concealWords("She hated her parents' endless interrogations about where she'd been", [ "interrogation", "interrogate" ])
    expect(disguised).toBe("She hated her parents' endless ~s about where she'd been")
  })

  it("handles 'It is important to have someone you can confide in'", () => {
    const disguised = vm.concealWords("It is important to have someone you can confide in", [ "confide", "in", "sb" ])
    expect(disguised).toBe("It is important to have someone you can ~ ~")
  })

  it("handles 'She used to confide in him whenever she had a problem'", () => {
    const disguised = vm.concealWords("She used to confide in him whenever she had a problem", [ "confide", "in", "sb" ])
    expect(disguised).toBe("She used to ~ ~ him whenever she had a problem")
  })

  it("handles 'In rural areas, the school is often the focal point for the local community.'", () => {
    const disguised = vm.concealWords("In rural areas, the school is often the focal point for the local community.", [ "focal", "point" ])
    expect(disguised).toBe("In rural areas, the school is often the ~ ~ for the local community.")
  })

  it("handles 'He quickly became the focal point for those who disagreed with government policy.'", () => {
    const disguised = vm.concealWords("He quickly became the focal point for those who disagreed with government policy.", [ "focal", "point" ])
    expect(disguised).toBe("He quickly became the ~ ~ for those who disagreed with government policy.")
  })

  it("handles 'She lit a candle'", () => {
    const disguised = vm.concealWords("She lit a candle", [ "light", "lit" ])
    expect(disguised).toBe("She ~ a candle")
  })

  it("handles 'The candles were lit'", () => {
    const disguised = vm.concealWords("The candles were lit", [ "light", "lit" ])
    expect(disguised).toBe("The candles were ~")
  })

  it("handles 'Steve took out a cigarette and lit it'", () => {
    const disguised = vm.concealWords("Steve took out a cigarette and lit it", [ "light", "lit" ])
    expect(disguised).toBe("Steve took out a cigarette and ~ it")
  })

  it("handles 'The stage was lit by bright spotlights'", () => {
    const disguised = vm.concealWords("The stage was lit by bright spotlights", [ "light", "lit" ])
    expect(disguised).toBe("The stage was ~ by bright spotlights")
  })

  it("handles 'Well/badly lit streets'", () => {
    const disguised = vm.concealWords("Well/badly lit streets", [ "light", "lit" ])
    expect(disguised).toBe("Well/badly ~ streets")
  })

  it("handles 'There was a hint of smugness in her voice'", () => {
    const disguised = vm.concealWords("There was a hint of smugness in her voice", [ "smug", "complacent", "smugly", "smugness" ])
    expect(disguised).toBe("There was a hint of ~ in her voice")
  })

  it("handles 'Deteriorating weather conditions'", () => {
    const disguised = vm.concealWords("Deteriorating weather conditions", [ "deteriorate", "deterioration" ])
    expect(disguised).toBe("~ing weather conditions")
  })

  it("handles 'A serious deterioration in relations between the two countries'", () => {
    const disguised = vm.concealWords("A serious deterioration in relations between the two countries", [ "deteriorate", "deterioration" ])
    expect(disguised).toBe("A serious ~ in relations between the two countries")
  })

  it("handles 'They were accused of inciting the crowd to violence'", () => {
    const disguised = vm.concealWords("They were accused of inciting the crowd to violence", [ "incite" ])
    expect(disguised).toBe("They were accused of ~ing the crowd to violence")
  })

  it("handles 'She just managed to hold back her anger.'", () => {
    const disguised = vm.concealWords("She just managed to hold back her anger.", [ "hold", "back" ])
    expect(disguised).toBe("She just managed to ~ ~ her anger.")
  })

  it("handles 'He bravely held back his tears.'", () => {
    const disguised = vm.concealWords("He bravely held back his tears.", [ "hold", "back" ])
    expect(disguised).toBe("He bravely ~ ~ his tears.")
  })

  it("handles 'She held back, not knowing how to break the terrible news.'", () => {
    const disguised = vm.concealWords("She held back, not knowing how to break the terrible news.", [ "hold", "back" ])
    expect(disguised).toBe("She ~ ~, not knowing how to break the terrible news.")
  })

  it("handles 'I wanted to tell him the truth, but something held me back.'", () => {
    const disguised = vm.concealWords("I wanted to tell him the truth, but something held me back.", [ "hold", "back" ])
    expect(disguised).toBe("I wanted to tell him the truth, but something ~ me ~.")
  })

  it("handles 'to hold in your feelings/anger'", () => {
    const disguised = vm.concealWords("to hold in your feelings/anger", [ "hold", "in" ])
    expect(disguised).toBe("to ~ ~ your feelings/anger")
  })

  it("handles 'He held in is anger in and didn't shout at the boy.'", () => {
    const disguised = vm.concealWords("He held in is anger in and didn't shout at the boy.", [ "hold", "in" ])
    expect(disguised).toBe("He ~ ~ is anger ~ and didn't shout at the boy.")
  })

  it("handles 'Hold on a minute while I get my breath back.'", () => {
    const disguised = vm.concealWords("Hold on a minute while I get my breath back.", [ "hold", "on" ])
    expect(disguised).toBe("~ ~ a minute while I get my breath back.")
  })

  it("handles 'Hold on! This isn't the right road.'", () => {
    const disguised = vm.concealWords("Hold on! This isn't the right road.", [ "hold", "on" ])
    expect(disguised).toBe("~ ~! This isn't the right road.")
  })

  it("handles 'Please hold on, Mrs White is on the other line.'", () => {
    const disguised = vm.concealWords("Please hold on, Mrs White is on the other line.", [ "hold", "on" ])
    expect(disguised).toBe("Please ~ ~, Mrs White is ~ the other line.")
  })

  it("handles 'The food supplies won't hold out until Monday so we'll have to find some food before.'", () => {
    const disguised = vm.concealWords("The food supplies won't hold out until Monday so we'll have to find some food before.", [ "hold", "out" ])
    expect(disguised).toBe("The food supplies won't ~ ~ until Monday so we'll have to find some food before.")
  })

  it("handles 'We can stay here for as long as our supplies hold out.'", () => {
    const disguised = vm.concealWords("We can stay here for as long as our supplies hold out.", [ "hold", "out" ])
    expect(disguised).toBe("We can stay here for as long as our supplies ~ ~.")
  })

  it("handles 'The rebels held out in the mountains for several years.'", () => {
    const disguised = vm.concealWords("The rebels held out in the mountains for several years.", [ "hold", "out" ])
    expect(disguised).toBe("The rebels ~ ~ in the mountains for several years.")
  })

  it("handles 'The miners held out for 18 months before they called off the strike.'", () => {
    const disguised = vm.concealWords("The miners held out for 18 months before they called off the strike.", [ "hold", "out" ])
    expect(disguised).toBe("The miners ~ ~ for 18 months before they called off the strike.")
  })

  it("handles 'Whatever you say, I'll hold to my opinion.'", () => {
    const disguised = vm.concealWords("Whatever you say, I'll hold to my opinion.", [ "hold", "to" ])
    expect(disguised).toBe("Whatever you say, I'll ~ ~ my opinion.")
  })

  it("handles 'Sorry we're late, we were held up in traffic.'", () => {
    const disguised = vm.concealWords("Sorry we're late, we were held up in traffic.", [ "hold", "up" ])
    expect(disguised).toBe("Sorry we're late, we were ~ ~ in traffic.")
  })

  it("handles 'An accident is holding up traffic.'", () => {
    const disguised = vm.concealWords("An accident is holding up traffic.", [ "hold", "up" ])
    expect(disguised).toBe("An accident is ~ing ~ traffic.")
  })

  it("handles 'My application was held up by the postal strike.'", () => {
    const disguised = vm.concealWords("My application was held up by the postal strike.", [ "hold", "up" ])
    expect(disguised).toBe("My application was ~ ~ by the postal strike.")
  })

  it("handles 'Masked men held up a security van in South London yesterday.'", () => {
    const disguised = vm.concealWords("Masked men held up a security van in South London yesterday.", [ "hold", "up" ])
    expect(disguised).toBe("Masked men ~ ~ a security van in South London yesterday.")
  })

  it("handles 'The robbers held up the train and stole 2200000.'", () => {
    const disguised = vm.concealWords("The robbers held up the train and stole 2200000.", [ "hold", "up" ])
    expect(disguised).toBe("The robbers ~ ~ the train and stole 2200000.")
  })

  it("handles 'She gets very bad-tempered when she's tired'", () => {
    const disguised = vm.concealWords("She gets very bad-tempered when she's tired", [ "bad-tempered", "grumpy" ])
    expect(disguised).toBe("She gets very ~ when she's tired")
  })

  it("handles 'He sat in bad-tempered silence'", () => {
    const disguised = vm.concealWords("He sat in bad-tempered silence", [ "bad-tempered", "grumpy" ])
    expect(disguised).toBe("He sat in ~ silence")
  })

  it("handles 'The police kept after the escaped prisoners until they caught them.'", () => {
    const disguised = vm.concealWords("The police kept after the escaped prisoners until they caught them.", [ "keep", "after" ])
    expect(disguised).toBe("The police ~ ~ the escaped prisoners until they caught them.")
  })

  it("handles 'Keep away from the edge of the cliff.'", () => {
    const disguised = vm.concealWords("Keep away from the edge of the cliff.", [ "hold", "away" ])
    expect(disguised).toBe("Keep ~ from the edge of the cliff.")
  })

  it("handles 'She had to stay away of school as she was ill.'", () => {
    const disguised = vm.concealWords("She had to stay away of school as she was ill.", [ "hold", "away" ])
    expect(disguised).toBe("She had to stay ~ of school as she was ill.")
  })

  it("handles 'How did she manage to keep back her true feelings?'", () => {
    const disguised = vm.concealWords("How did she manage to keep back her true feelings?", [ "keep", "back" ])
    expect(disguised).toBe("How did she manage to ~ ~ her true feelings?")
  })

  it("handles 'Serenely beautiful'", () => {
    const disguised = vm.concealWords("Serenely beautiful", [ "serene", "serenely", "serenity" ])
    expect(disguised).toBe("~ly beautiful")
  })

  it("handles 'She smiled serenely'", () => {
    const disguised = vm.concealWords("She smiled serenely", [ "serene", "serenely", "serenity" ])
    expect(disguised).toBe("She smiled ~ly")
  })

  it("handles 'The hotel offers a haven of peace and serenity away from the bustle of the city'", () => {
    const disguised = vm.concealWords("The hotel offers a haven of peace and serenity away from the bustle of the city", [ "serene", "serenely", "serenity" ])
    expect(disguised).toBe("The hotel offers a haven of peace and ~ away from the bustle of the city")
  })

  it("handles 'to keep down wages/prices/the cost of living'", () => {
    const disguised = vm.concealWords("to keep down wages/prices/the cost of living", [ "keep", "down" ])
    expect(disguised).toBe("to ~ ~ wages/prices/the cost of living")
  })

  it("handles 'The government is trying to keep prices down.'", () => {
    const disguised = vm.concealWords("The government is trying to keep prices down.", [ "keep", "down" ])
    expect(disguised).toBe("The government is trying to ~ prices ~.")
  })

  it("handles 'The teacher kept us in for misbehaving in class.'", () => {
    const disguised = vm.concealWords("The teacher kept us in for misbehaving in class.", [ "keep", "in" ])
    expect(disguised).toBe("The teacher ~ us ~ for misbehaving ~ class.")
  })

  it("handles 'Although he failed his tests, he kept on studying and retook it in May.'", () => {
    const disguised = vm.concealWords("Although he failed his tests, he kept on studying and retook it in May.", [ "keep", "on" ])
    expect(disguised).toBe("Although he failed his tests, he ~ ~ studying and retook it in May.")
  })

  it("handles 'The rain kept on all night.'", () => {
    const disguised = vm.concealWords("The rain kept on all night.", [ "keep", "on" ])
    expect(disguised).toBe("The rain ~ ~ all night.")
  })

  it("handles 'He locked the gate to keep out unwanted visitors.'", () => {
    const disguised = vm.concealWords("He locked the gate to keep out unwanted visitors.", [ "keep", "out" ])
    expect(disguised).toBe("He locked the gate to ~ ~ unwanted visitors.")
  })

  it("handles 'Despite being ill he kept up with his work and passed the exam.'", () => {
    const disguised = vm.concealWords("Despite being ill he kept up with his work and passed the exam.", [ "keep", "up", "with" ])
    expect(disguised).toBe("Despite being ill he ~ ~ ~ his work and passed the exam.")
  })

  it("handles 'I can't keep up with all the changes.'", () => {
    const disguised = vm.concealWords("I can't keep up with all the changes.", [ "keep", "up", "with" ])
    expect(disguised).toBe("I can't ~ ~ ~ all the changes.")
  })

  it("handles 'He reads newspaper every day to keep up with the news.'", () => {
    const disguised = vm.concealWords("He reads newspaper every day to keep up with the news.", [ "keep", "up", "with" ])
    expect(disguised).toBe("He reads newspaper every day to ~ ~ ~ the news.")
  })

  it("handles 'She likes to keep up with the latest fashions.'", () => {
    const disguised = vm.concealWords("She likes to keep up with the latest fashions.", [ "keep", "up", "with" ])
    expect(disguised).toBe("She likes to ~ ~ ~ the latest fashions.")
  })

  it("handles 'I now call upon the chairman to address the meeting'", () => {
    const disguised = vm.concealWords("I now call upon the chairman to address the meeting", [ "call", "on", "upon", "sb" ])
    expect(disguised).toBe("I now ~ ~ the chairman to address the meeting")
  })

  it("handles 'I feel called upon (= feel that I ought) to warn you that…'", () => {
    const disguised = vm.concealWords("I feel called upon (= feel that I ought) to warn you that…", [ "call", "on", "upon", "sb" ])
    expect(disguised).toBe("I feel ~ed ~ (= feel that I ought) to warn you that…")
  })

  it("handles 'Spencer recalls a recent talk he gave in which he called on fellow researchers to make a greater effort to communicate their findings'", () => {
    const disguised = vm.concealWords("Spencer recalls a recent talk he gave in which he called on fellow researchers to make a greater effort to communicate their findings", [ "call", "on", "upon", "sb" ])
    expect(disguised).toBe("Spencer recalls a recent talk he gave in which he ~ed ~ fellow researchers to make a greater effort to communicate their findings")
  })

  it("handles 'I told him I wasn't interested, but he wasn't deterred'", () => {
    const disguised = vm.concealWords("I told him I wasn't interested, but he wasn't deterred", [ "deter" ])
    expect(disguised).toBe("I told him I wasn't interested, but he wasn't ~ed")
  })

  it("handles 'Women were conspicuously absent from (= there were surprisingly few women on) the planning committee'", () => {
    const disguised = vm.concealWords("Women were conspicuously absent from (= there were surprisingly few women on) the planning committee", [ "conspicuous", "conspicuously", "conspicuousness" ])
    expect(disguised).toBe("Women were ~ly absent from (= there were surprisingly few women on) the planning committee")
  })

  it("handles 'A strong sense of cohesiveness within the family'", () => {
    const disguised = vm.concealWords("A strong sense of cohesiveness within the family", [ "cohesive", "cohesiveness" ])
    expect(disguised).toBe("A strong sense of ~ within the family")
  })

  it("handles 'Buy this dress - it's simply made for you'", () => {
    const disguised = vm.concealWords("Buy this dress - it's simply made for you", [ "be", "made", "for" ])
    expect(disguised).toBe("Buy this dress - it's simply ~ ~ you")
  })

  it("handles 'It's late. Let's make for home as quickly as possible.'", () => {
    const disguised = vm.concealWords("It's late. Let's make for home as quickly as possible.", [ "make", "for" ])
    expect(disguised).toBe("It's late. Let's ~ ~ home as quickly as possible.")
  })

  it("handles 'I can't make out what the name on the bell is.'", () => {
    const disguised = vm.concealWords("I can't make out what the name on the bell is.", [ "make", "out" ])
    expect(disguised).toBe("I can't ~ ~ what the name on the bell is.")
  })

  it("handles 'He made out a cheque for €100.'", () => {
    const disguised = vm.concealWords("He made out a cheque for €100.", [ "make", "out" ])
    expect(disguised).toBe("He ~ ~ a cheque for €100.")
  })

  it("handles 'The doctor made out a prescription for me.'", () => {
    const disguised = vm.concealWords("The doctor made out a prescription for me.", [ "make", "out" ])
    expect(disguised).toBe("The doctor ~ ~ a prescription for me.")
  })

  it("handles 'Applications must be made out in triplicate.'", () => {
    const disguised = vm.concealWords("Applications must be made out in triplicate.", [ "make", "out" ])
    expect(disguised).toBe("Applications must be ~ ~ in triplicate.")
  })

  it("handles 'He made over the property to his eldest son.'", () => {
    const disguised = vm.concealWords("He made over the property to his eldest son.", [ "make", "over" ])
    expect(disguised).toBe("He ~ ~ the property to his eldest son.")
  })

  it("handles 'Before her uncle died he made over his whole estate to them.'", () => {
    const disguised = vm.concealWords("Before her uncle died he made over his whole estate to them.", [ "make", "over" ])
    expect(disguised).toBe("Before her uncle died he ~ ~ his whole estate to them.")
  })

  it("handles 'He made up some excuse about his daughter being sick.'", () => {
    const disguised = vm.concealWords("He made up some excuse about his daughter being sick.", [ "make", "up" ])
    expect(disguised).toBe("He ~ ~ some excuse about his daughter being sick.")
  })

  it("handles 'I told the kids a story, making it up as I went along.'", () => {
    const disguised = vm.concealWords("I told the kids a story, making it up as I went along.", [ "make", "up" ])
    expect(disguised).toBe("I told the kids a story, ~ing it ~ as I went along.")
  })

  it("handles 'You made that up!'", () => {
    const disguised = vm.concealWords("You made that up!", [ "make", "up" ])
    expect(disguised).toBe("You ~ that ~!")
  })

  it("handles 'That is not true, she made the whole thing up'", () => {
    const disguised = vm.concealWords("That is not true, she made the whole thing up", [ "make", "up" ])
    expect(disguised).toBe("That is not true, she ~ the whole thing ~")
  })

  it("handles 'Thank goodness they've made up after their quarrel.'", () => {
    const disguised = vm.concealWords("Thank goodness they've made up after their quarrel.", [ "make", "up" ])
    expect(disguised).toBe("Thank goodness they've ~ ~ after their quarrel.")
  })

  it("handles 'A warm and sunny September made up for a miserable wet August.'", () => {
    const disguised = vm.concealWords("A warm and sunny September made up for a miserable wet August.", [ "make", "up" ])
    expect(disguised).toBe("A warm and sunny September ~ ~ for a miserable wet August.")
  })

  it("handles 'She can't make up her mind whether to go to Turkey of India.'", () => {
    const disguised = vm.concealWords("She can't make up her mind whether to go to Turkey of India.", [ "make", "up", "sb's", "mind" ])
    expect(disguised).toBe("She can't ~ ~ ~ ~ whether to go to Turkey of India.")
  })

  it("handles 'His parents agreed to pay the rent for his apartment but otherwise left him to fend for himself'", () => {
    const disguised = vm.concealWords("His parents agreed to pay the rent for his apartment but otherwise left him to fend for himself", [ "fend", "for", "yourself" ])
    expect(disguised).toBe("His parents agreed to pay the rent ~ his apartment but otherwise left him to ~ ~ himself")
  })

  it("handles 'The fox was released into the wild when it was old enough to fend for itself'", () => {
    const disguised = vm.concealWords("The fox was released into the wild when it was old enough to fend for itself", [ "fend", "for", "yourself" ])
    expect(disguised).toBe("The fox was released into the wild when it was old enough to ~ ~ itself")
  })

  it("handles 'The police officer fended off the blows with his riot shield'", () => {
    const disguised = vm.concealWords("The police officer fended off the blows with his riot shield", [ "fend", "sb", "sth", "off", "fight", "ward" ])
    expect(disguised).toBe("The police officer ~ed ~ the blows with his riot shield")
  })

  it("handles 'She managed to fend off questions about new tax increases'", () => {
    const disguised = vm.concealWords("She managed to fend off questions about new tax increases", [ "fend", "sb", "sth", "off", "ward" ])
    expect(disguised).toBe("She managed to ~ ~ questions about new tax increases")
  })

  it("handles 'The Prime Minister fended off three challenges to her leadership'", () => {
    const disguised = vm.concealWords("The Prime Minister fended off three challenges to her leadership", [ "fend", "sb", "sth", "off", "ward" ])
    expect(disguised).toBe("The Prime Minister ~ed ~ three challenges to her leadership")
  })

  it("handles 'A certificate of language proficiency'", () => {
    const disguised = vm.concealWords("A certificate of language proficiency", [ "proficient", "proficiency" ])
    expect(disguised).toBe("A certificate of language ~")
  })

  it("handles 'For the first time, linguists have put a price on language - to save a language from extinction.'", () => {
    const disguised = vm.concealWords("For the first time, linguists have put a price on language - to save a language from extinction.", [ "put", "a", "price", "on", "something" ])
    expect(disguised).toBe("For the first time, linguists have ~ ~ ~ ~ language - to save ~ language from extinction.")
  })

  it("handles 'They haven't yet put a price on the business.'", () => {
    const disguised = vm.concealWords("They haven't yet put a price on the business.", [ "put", "a", "price", "on", "something" ])
    expect(disguised).toBe("They haven't yet ~ ~ ~ ~ the business.")
  })

  it("handles 'You're bound to be nervous the first time (= it's easy to understand).'", () => {
    const disguised = vm.concealWords("You're bound to be nervous the first time (= it's easy to understand).", [ "bound", "to" ])
    expect(disguised).toBe("You're ~ ~ be nervous the first time (= it's easy ~ understand).")
  })

  it("handles 'The solution here was the creation in 1980s of a unified written language for all these dialects.'", () => {
    const disguised = vm.concealWords("The solution here was the creation in 1980s of a unified written language for all these dialects.", [ "unify" ])
    expect(disguised).toBe("The solution here was the creation in 1980s of a ~ed written language for all these dialects.")
  })

  it("handles 'The painting looks like it's upside down to me.'", () => {
    const disguised = vm.concealWords("The painting looks like it's upside down to me.", [ "upside", "down" ])
    expect(disguised).toBe("The painting looks like it's ~ ~ to me.")
  })

  it("handles 'Flamingos can only eat with their heads upside down.'", () => {
    const disguised = vm.concealWords("Flamingos can only eat with their heads upside down.", [ "upside", "down" ])
    expect(disguised).toBe("Flamingos can only eat with their heads ~ ~.")
  })

  it("handles 'His reply was some cock and bull story about having to give her a lift home.'", () => {
    const disguised = vm.concealWords("His reply was some cock and bull story about having to give her a lift home.", [ "cock", "and", "bull", "story" ])
    expect(disguised).toBe("His reply was some ~ ~ ~ ~ about having to give her a lift home.")
  })

  it("handles 'You should walk around your home three times backwards and counterclockwise before sunset on Halloween to ward off evil spirit.'", () => {
    const disguised = vm.concealWords("You should walk around your home three times backwards and counterclockwise before sunset on Halloween to ward off evil spirit.", [ "counterclockwise" ])
    expect(disguised).toBe("You should walk around your home three times backwards and ~ before sunset on Halloween to ward off evil spirit.")
  })

  it("handles 'Despite the obvious setbacks, it is not all doom and gloom for the England team.'", () => {
    const disguised = vm.concealWords("Despite the obvious setbacks, it is not all doom and gloom for the England team.", [ "doom", "and", "gloom" ])
    expect(disguised).toBe("Despite the obvious setbacks, it is not all ~ ~ ~ for the England team.")
  })

  it("handles 'If he loses this referendum, it will sound the death knell for his leadership.'", () => {
    const disguised = vm.concealWords("If he loses this referendum, it will sound the death knell for his leadership.", [ "death", "knell" ])
    expect(disguised).toBe("If he loses this referendum, it will sound the ~ ~ for his leadership.")
  })

  it("handles 'Doom merchants were predicting that the growth in video games and the rise of the Internet would sound the death knell for children's literature.'", () => {
    const disguised = vm.concealWords("Doom merchants were predicting that the growth in video games and the rise of the Internet would sound the death knell for children's literature.", [ "death", "knell" ])
    expect(disguised).toBe("Doom merchants were predicting that the growth in video games and the rise of the Internet would sound the ~ ~ for children's literature.")
  })

  it("handles 'a lucrative business/contract/market'", () => {
    const disguised = vm.concealWords("a lucrative business/contract/market", [ "lucrative" ])
    expect(disguised).toBe("a ~ business/contract/market")
  })

  it("handles 'Moreover, the children's book market, which traditionally was seen as a poor cousin to the more lucrative and successful adult market, has come into its own.'", () => {
    const disguised = vm.concealWords("Moreover, the children's book market, which traditionally was seen as a poor cousin to the more lucrative and successful adult market, has come into its own.", [ "lucrative" ])
    expect(disguised).toBe("Moreover, the children's book market, which traditionally was seen as a poor cousin to the more ~ and successful adult market, has come into its own.")
  })

  it("handles 'Education is currently undervalued in this country.'", () => {
    const disguised = vm.concealWords("Education is currently undervalued in this country.", [ "undervalue" ])
    expect(disguised).toBe("Education is currently ~ed in this country.")
  })

  it("handles 'He believes his house has been undervalued.'", () => {
    const disguised = vm.concealWords("He believes his house has been undervalued.", [ "undervalue" ])
    expect(disguised).toBe("He believes his house has been ~ed.")
  })

  it("handles 'To pick up bad habits'", () => {
    const disguised = vm.concealWords("To pick up bad habits", [ "pick", "sth", "up" ])
    expect(disguised).toBe("To ~ ~ bad habits")
  })

  it("handles 'Here's a tip I picked up from my mother'", () => {
    const disguised = vm.concealWords("Here's a tip I picked up from my mother", [ "pick", "sth", "up" ])
    expect(disguised).toBe("Here's a tip I ~ed ~ from my mother")
  })

  it("handles 'She picked up Spanish when she was living in Mexico'", () => {
    const disguised = vm.concealWords("She picked up Spanish when she was living in Mexico", [ "pick", "sth", "up" ])
    expect(disguised).toBe("She ~ed ~ Spanish when she was living in Mexico")
  })

  it("handles 'Where did you pick up that idea?'", () => {
    const disguised = vm.concealWords("Where did you pick up that idea?", [ "pick", "sth", "up" ])
    expect(disguised).toBe("Where did you ~ ~ that idea?")
  })

  it("handles 'Tiny boats bobbed up and down in the harbour'", () => {
    const disguised = vm.concealWords("Tiny boats bobbed up and down in the harbour", [ "bob" ])
    expect(disguised).toBe("Tiny boats ~ed up and down in the harbour")
  })

  it("handles 'She bobbed her head nervously'", () => {
    const disguised = vm.concealWords("She bobbed her head nervously", [ "bob" ])
    expect(disguised).toBe("She ~ed her head nervously")
  })

  it("handles 'The maid bobbed a curtsy'", () => {
    const disguised = vm.concealWords("The maid bobbed a curtsy", [ "bob" ])
    expect(disguised).toBe("The maid ~ed a curtsy")
  })

  it("handles 'I knitted this cardigan myself'", () => {
    const disguised = vm.concealWords("I knitted this cardigan myself", [ "knit" ])
    expect(disguised).toBe("I ~ed this cardigan myself")
  })

  it("handles 'Lucy was sitting on the sofa, knitting'", () => {
    const disguised = vm.concealWords("Lucy was sitting on the sofa, knitting", [ "knit" ])
    expect(disguised).toBe("Lucy was sitting on the sofa, ~ing")
  })

  it("handles 'She's knitting the baby a shawl'", () => {
    const disguised = vm.concealWords("She's knitting the baby a shawl", [ "knit" ])
    expect(disguised).toBe("She's ~ing the baby a shawl")
  })

  it("handles 'He pulled up at the traffic lights'", () => {
    const disguised = vm.concealWords("He pulled up at the traffic lights", [ "pull", "up" ])
    expect(disguised).toBe("He ~ed ~ at the traffic lights")
  })

  it("handles 'large disparities'", () => {
    const disguised = vm.concealWords("large disparities", [ "disparity" ])
    expect(disguised).toBe("large ~s")
  })

  it("handles 'growing regional disparities in economic prosperity'", () => {
    const disguised = vm.concealWords("growing regional disparities in economic prosperity", [ "disparity" ])
    expect(disguised).toBe("growing regional ~s in economic prosperity")
  })

  it("handles 'Temperature will be kept constant to stop the seeds germinating or rotting, the wheat seeds will remain viable for an estimated 1700 years'", () => {
    const disguised = vm.concealWords("Temperature will be kept constant to stop the seeds germinating or rotting, the wheat seeds will remain viable for an estimated 1700 years", [ "germinate" ])
    expect(disguised).toBe("Temperature will be kept constant to stop the seeds ~ing or rotting, the wheat seeds will remain viable for an estimated 1700 years")
  })

  it("handles 'I no further evidence was available of the sophistication of China in the Tang era, then a look at Chinese medicine would be sufficient.'", () => {
    const disguised = vm.concealWords("I no further evidence was available of the sophistication of China in the Tang era, then a look at Chinese medicine would be sufficient.", [ "sufficient" ])
    expect(disguised).toBe("I no further evidence was available of the sophistication of China in the Tang era, then a look at Chinese medicine would be ~.")
  })

  it("handles 'Allow sufficient time to get there.'", () => {
    const disguised = vm.concealWords("Allow sufficient time to get there.", [ "sufficient" ])
    expect(disguised).toBe("Allow ~ time to get there.")
  })

  it("handles 'These reasons are not sufficient to justify the ban.'", () => {
    const disguised = vm.concealWords("These reasons are not sufficient to justify the ban.", [ "sufficient" ])
    expect(disguised).toBe("These reasons are not ~ to justify the ban.")
  })

  it("handles 'in accordance with legal requirements'", () => {
    const disguised = vm.concealWords("in accordance with legal requirements", [ "in", "accordance", "with", "something" ])
    expect(disguised).toBe("~ ~ ~ legal requirements")
  })

  it("handles 'We acted in accordance with my parents' wishes.'", () => {
    const disguised = vm.concealWords("We acted in accordance with my parents' wishes.", [ "in", "accordance", "with", "something" ])
    expect(disguised).toBe("We acted ~ ~ ~ my parents' wishes.")
  })

  it("handles 'He was banished to Australia, where he died five years later.'", () => {
    const disguised = vm.concealWords("He was banished to Australia, where he died five years later.", [ "banish" ])
    expect(disguised).toBe("He was ~ed to Australia, where he died five years later.")
  })

  it("handles 'The children were banished from the dining room.'", () => {
    const disguised = vm.concealWords("The children were banished from the dining room.", [ "banish" ])
    expect(disguised).toBe("The children were ~ed from the dining room.")
  })

  it("handles 'He puts aside 50 a month fir his summer holidays.'", () => {
    const disguised = vm.concealWords("He puts aside 50 a month fir his summer holidays.", [ "pu", "aside" ])
    expect(disguised).toBe("He puts ~ 50 a month fir his summer holidays.")
  })

  it("handles 'We put some money aside every month for our retirement.'", () => {
    const disguised = vm.concealWords("We put some money aside every month for our retirement.", [ "pu", "aside" ])
    expect(disguised).toBe("We put some money ~ every month for our retirement.")
  })

  it("handles 'The lecturer managed to put his ideas across to the audience.'", () => {
    const disguised = vm.concealWords("The lecturer managed to put his ideas across to the audience.", [ "put", "across" ])
    expect(disguised).toBe("The lecturer managed to ~ his ideas ~ to the audience.")
  })

  it("handles 'I'm just going to put the car away (= in the garage).'", () => {
    const disguised = vm.concealWords("I'm just going to put the car away (= in the garage).", [ "put", "away" ])
    expect(disguised).toBe("I'm just going to ~ the car ~ (= in the garage).")
  })

  it("handles 'Put the toys away in the cupboard. We are expecting guests tonight.'", () => {
    const disguised = vm.concealWords("Put the toys away in the cupboard. We are expecting guests tonight.", [ "put", "away" ])
    expect(disguised).toBe("~ the toys ~ in the cupboard. We are expecting guests tonight.")
  })

  it("handles 'The murderer was put away for 10 years.'", () => {
    const disguised = vm.concealWords("The murderer was put away for 10 years.", [ "put", "away" ])
    expect(disguised).toBe("The murderer was ~ ~ for 10 years.")
  })

  it("handles 'Make sure you write put down everything said at the meeting.'", () => {
    const disguised = vm.concealWords("Make sure you write put down everything said at the meeting.", [ "put", "down" ])
    expect(disguised).toBe("Make sure you write ~ ~ everything said at the meeting.")
  })

  it("handles 'The meeting's on the 22nd. Put it down in your diary.'", () => {
    const disguised = vm.concealWords("The meeting's on the 22nd. Put it down in your diary.", [ "put", "down" ])
    expect(disguised).toBe("The meeting's on the 22nd. ~ it ~ in your diary.")
  })

  it("handles 'What do you put her success down to?'", () => {
    const disguised = vm.concealWords("What do you put her success down to?", [ "put", "down", "to" ])
    expect(disguised).toBe("What do you ~ her success ~ ~?")
  })

  it("handles 'She puts her recent success down to hard work.'", () => {
    const disguised = vm.concealWords("She puts her recent success down to hard work.", [ "put", "down", "to" ])
    expect(disguised).toBe("She ~s her recent success ~ ~ hard work.")
  })

  it("handles 'to put forward a suggestion'", () => {
    const disguised = vm.concealWords("to put forward a suggestion", [ "put", "forward" ])
    expect(disguised).toBe("to ~ ~ a suggestion")
  })

  it("handles 'He put forward a new plan to help decrease unemployment'", () => {
    const disguised = vm.concealWords("He put forward a new plan to help decrease unemployment", [ "put", "forward" ])
    expect(disguised).toBe("He ~ ~ a new plan to help decrease unemployment")
  })

  it("handles 'The meeting was put off due to the president' illness.'", () => {
    const disguised = vm.concealWords("The meeting was put off due to the president' illness.", [ "put", "off" ])
    expect(disguised).toBe("The meeting was ~ ~ due to the president' illness.")
  })

  it("handles 'It's too late to put them off now.'", () => {
    const disguised = vm.concealWords("It's too late to put them off now.", [ "put", "off" ])
    expect(disguised).toBe("It's too late to ~ them ~ now.")
  })

  it("handles 'Hurry up! Put your coat on!'", () => {
    const disguised = vm.concealWords("Hurry up! Put your coat on!", [ "put", "on" ])
    expect(disguised).toBe("Hurry up! ~ your coat ~!")
  })

  it("handles 'He has put on weight since he stopped smoking.'", () => {
    const disguised = vm.concealWords("He has put on weight since he stopped smoking.", [ "put", "on" ])
    expect(disguised).toBe("He has ~ ~ weight since he stopped smoking.")
  })

  it("handles 'The fire-fighters put out the fire quickly.'", () => {
    const disguised = vm.concealWords("The fire-fighters put out the fire quickly.", [ "put", "out" ])
    expect(disguised).toBe("The fire-fighters ~ ~ the fire quickly.")
  })

  it("handles 'o put out a candle/cigarette/light'", () => {
    const disguised = vm.concealWords("o put out a candle/cigarette/light", [ "put", "out" ])
    expect(disguised).toBe("o ~ ~ a candle/cigarette/light")
  })

  it("handles 'I hope our arriving late didn't put them out'", () => {
    const disguised = vm.concealWords("I hope our arriving late didn't put them out", [ "put", "out" ])
    expect(disguised).toBe("I hope our arriving late didn't ~ them ~")
  })

  it("handles 'I hope so I am not putting you out asking you to do this.'", () => {
    const disguised = vm.concealWords("I hope so I am not putting you out asking you to do this.", [ "put", "out" ])
    expect(disguised).toBe("I hope so I am not ~ing you ~ asking you to do this.")
  })

  it("handles 'Could you put me through to the manager, please?'", () => {
    const disguised = vm.concealWords("Could you put me through to the manager, please?", [ "put", "through" ])
    expect(disguised).toBe("Could you ~ me ~ to the manager, please?")
  })

  it("handles 'to put up a building/fence/memorial/tent'", () => {
    const disguised = vm.concealWords("to put up a building/fence/memorial/tent", [ "put", "up" ])
    expect(disguised).toBe("to ~ ~ a building/fence/memorial/tent")
  })

  it("handles 'We put up at a motel.'", () => {
    const disguised = vm.concealWords("We put up at a motel.", [ "put", "up" ])
    expect(disguised).toBe("We ~ ~ at a motel.")
  })

  it("handles 'I won't put up with such rude behaviour any longer.'", () => {
    const disguised = vm.concealWords("I won't put up with such rude behaviour any longer.", [ "put", "up", "with" ])
    expect(disguised).toBe("I won't ~ ~ ~ such rude behaviour any longer.")
  })

  it("handles 'You can pay back the loan over a period of three years.'", () => {
    const disguised = vm.concealWords("You can pay back the loan over a period of three years.", [ "pay", "back" ])
    expect(disguised).toBe("You can ~ ~ the loan over a period of three years.")
  })

  it("handles 'Did he ever pay you back that 100 he owes you?'", () => {
    const disguised = vm.concealWords("Did he ever pay you back that 100 he owes you?", [ "pay", "back" ])
    expect(disguised).toBe("Did he ever ~ you ~ that 100 he owes you?")
  })

  it("handles 'I promise I will pay back as soon as I get paid.'", () => {
    const disguised = vm.concealWords("I promise I will pay back as soon as I get paid.", [ "pay", "back" ])
    expect(disguised).toBe("I promise I will ~ ~ as soon as I get ~.")
  })

  it("handles 'I promise I will pay you back one day for what you did to my family'", () => {
    const disguised = vm.concealWords("I promise I will pay you back one day for what you did to my family", [ "pay", "back" ])
    expect(disguised).toBe("I promise I will ~ you ~ one day for what you did to my family")
  })

  it("handles 'We paid 100 down and the balance over a period of 6 months.'", () => {
    const disguised = vm.concealWords("We paid 100 down and the balance over a period of 6 months.", [ "pay", "down" ])
    expect(disguised).toBe("We ~ 100 ~ and the balance over a period of 6 months.")
  })

  it("handles 'She used the money to pay down her mortgage.'", () => {
    const disguised = vm.concealWords("She used the money to pay down her mortgage.", [ "pay", "down" ])
    expect(disguised).toBe("She used the money to ~ ~ her mortgage.")
  })

  it("handles 'All criminals should pay for their crimes.'", () => {
    const disguised = vm.concealWords("All criminals should pay for their crimes.", [ "pay", "for" ])
    expect(disguised).toBe("All criminals should ~ ~ their crimes.")
  })

  it("handles 'They paid off all their senior management in an attempt to restructure the company.'", () => {
    const disguised = vm.concealWords("They paid off all their senior management in an attempt to restructure the company.", [ "pay", "off" ])
    expect(disguised).toBe("They ~ ~ all their senior management in an attempt to restructure the company.")
  })

  it("handles 'The crew were paid off as soon as the ship docked.'", () => {
    const disguised = vm.concealWords("The crew were paid off as soon as the ship docked.", [ "pay", "off" ])
    expect(disguised).toBe("The crew were ~ ~ as soon as the ship docked.")
  })

  it("handles 'I had a hard time getting him to pay up.'", () => {
    const disguised = vm.concealWords("I had a hard time getting him to pay up.", [ "pay", "up" ])
    expect(disguised).toBe("I had a hard time getting him to ~ ~.")
  })

  it("handles 'As I hadn't paid my monthly instalments the company requested me to pay up the balance.'", () => {
    const disguised = vm.concealWords("As I hadn't paid my monthly instalments the company requested me to pay up the balance.", [ "pay", "up" ])
    expect(disguised).toBe("As I hadn't ~ my monthly instalments the company requested me to ~ ~ the balance.")
  })

  it("handles 'His uncle passed away last year.'", () => {
    const disguised = vm.concealWords("His uncle passed away last year.", [ "pass", "away" ])
    expect(disguised).toBe("His uncle ~ed ~ last year.")
  })

  it("handles 'He passed out from the fumes, and it took them some time to bring him round.'", () => {
    const disguised = vm.concealWords("He passed out from the fumes, and it took them some time to bring him round.", [ "pass", "out" ])
    expect(disguised).toBe("He ~ed ~ from the fumes, and it took them some time to bring him round.")
  })

  it("handles 'There are many foundations protecting Congo's wildlife, as the country possesses an astounding density of gorillas.'", () => {
    const disguised = vm.concealWords("There are many foundations protecting Congo's wildlife, as the country possesses an astounding density of gorillas.", [ "possess" ])
    expect(disguised).toBe("There are many foundations protecting Congo's wildlife, as the country ~s an astounding density of gorillas.")
  })

  it("handles 'They want to bring in a bill to limit arms exports'", () => {
    const disguised = vm.concealWords("They want to bring in a bill to limit arms exports", [ "bring", "sth", "in" ])
    expect(disguised).toBe("They want to ~ ~ a bill to limit arms exports")
  })

  it("handles 'What brought about the change in his attitude?'", () => {
    const disguised = vm.concealWords("What brought about the change in his attitude?", [ "bring", "sth", "about", "cause" ])
    expect(disguised).toBe("What ~ ~ the change in his attitude?")
  })

  it("handles 'The reason for this abundance is that cookbooks promise to bring about a kind of domestic transformation'", () => {
    const disguised = vm.concealWords("The reason for this abundance is that cookbooks promise to bring about a kind of domestic transformation", [ "bring", "sth", "about", "cause" ])
    expect(disguised).toBe("The reason for this abundance is that cookbooks promise to ~ ~ a kind of domestic transformation")
  })

  it("handles 'She had started to delve into her father's distant past'", () => {
    const disguised = vm.concealWords("She had started to delve into her father's distant past", [ "delve", "into", "sth" ])
    expect(disguised).toBe("She had started to ~ ~ her father's distant past")
  })

  it("handles 'Cookbooks also provide an opportunity to delve into distant cultures without having to turn up at an airport to get there'", () => {
    const disguised = vm.concealWords("Cookbooks also provide an opportunity to delve into distant cultures without having to turn up at an airport to get there", [ "delve", "into", "sth" ])
    expect(disguised).toBe("Cookbooks also provide an opportunity to ~ ~ distant cultures without having to turn up at an airport to get there")
  })

  it("handles 'That just about wraps it up for today'", () => {
    const disguised = vm.concealWords("That just about wraps it up for today", [ "wrap", "sth", "up" ])
    expect(disguised).toBe("That just about ~s it ~ for today")
  })

  it("handles 'Any contribution from sponsors assistance will have a prompt and direct effect on helping children break the cycle of poverty in which they are presently trapped.'", () => {
    const disguised = vm.concealWords("Any contribution from sponsors assistance will have a prompt and direct effect on helping children break the cycle of poverty in which they are presently trapped.", [ "break", "the", "vicious", "cycle" ])
    expect(disguised).toBe("Any contribution from sponsors assistance will have a prompt and direct effect on helping children ~ ~ ~ of poverty in which they are presently trapped.")
  })

  it("handles 'We couldn't make out the names on the gravestone because the letters had been completely worn away.'", () => {
    const disguised = vm.concealWords("We couldn't make out the names on the gravestone because the letters had been completely worn away.", [ "wear", "away" ])
    expect(disguised).toBe("We couldn't make out the names on the gravestone because the letters had been completely ~ ~.")
  })

  it("handles 'The inscription on the coin had worn away.'", () => {
    const disguised = vm.concealWords("The inscription on the coin had worn away.", [ "wear", "away" ])
    expect(disguised).toBe("The inscription on the coin had ~ ~.")
  })

  it("handles 'The steps had been worn away by the feet of thousands of pilgrims.'", () => {
    const disguised = vm.concealWords("The steps had been worn away by the feet of thousands of pilgrims.", [ "wear", "away" ])
    expect(disguised).toBe("The steps had been ~ ~ by the feet of thousands of pilgrims.")
  })

  it("handles 'Her persistence paid off and she eventually wore me down.'", () => {
    const disguised = vm.concealWords("Her persistence paid off and she eventually wore me down.", [ "wear", "down" ])
    expect(disguised).toBe("Her persistence paid off and she eventually ~ me ~.")
  })

  it("handles 'This relentless (okrutny) pressure began to wear down their resistance (opór).'", () => {
    const disguised = vm.concealWords("This relentless (okrutny) pressure began to wear down their resistance (opór).", [ "wear", "down" ])
    expect(disguised).toBe("This relentless (okrutny) pressure began to ~ ~ their resistance (opór).")
  })

  it("handles 'Your nervousness will wear off when the exams are over.'", () => {
    const disguised = vm.concealWords("Your nervousness will wear off when the exams are over.", [ "wear", "off" ])
    expect(disguised).toBe("Your nervousness will ~ ~ when the exams are over.")
  })

  it("handles 'The effects of the drug will soon wear off.'", () => {
    const disguised = vm.concealWords("The effects of the drug will soon wear off.", [ "wear", "off" ])
    expect(disguised).toBe("The effects of the drug will soon ~ ~.")
  })

  it("handles 'The effects of the drug will soon wear off.'", () => {
    const disguised = vm.concealWords("The effects of the drug will soon wear off.", [ "wear", "off" ])
    expect(disguised).toBe("The effects of the drug will soon ~ ~.")
  })

  it("handles 'The novelty of married life was beginning to wear off.'", () => {
    const disguised = vm.concealWords("The novelty of married life was beginning to wear off.", [ "wear", "off" ])
    expect(disguised).toBe("The novelty of married life was beginning to ~ ~.")
  })

  it("handles 'The kids have totally worn me out.'", () => {
    const disguised = vm.concealWords("The kids have totally worn me out.", [ "wear", "out" ])
    expect(disguised).toBe("The kids have totally ~ me ~.")
  })

  it("handles 'You'll wear yourself out if you carry on working so hard.'", () => {
    const disguised = vm.concealWords("You'll wear yourself out if you carry on working so hard.", [ "wear", "out" ])
    expect(disguised).toBe("You'll ~ yourself ~ if you carry on working so hard.")
  })

  it("handles 'I've worked so hard today, I am worn out.'", () => {
    const disguised = vm.concealWords("I've worked so hard today, I am worn out.", [ "wear", "out" ])
    expect(disguised).toBe("I've worked so hard today, I am ~ ~.")
  })

  it("handles 'We have to check this new drug to see how it works on animal.'", () => {
    const disguised = vm.concealWords("We have to check this new drug to see how it works on animal.", [ "work", "on" ])
    expect(disguised).toBe("We have to check this new drug to see how it ~s ~ animal.")
  })

  it("handles 'You need to work on your pronunciation a bit more.'", () => {
    const disguised = vm.concealWords("You need to work on your pronunciation a bit more.", [ "work", "on" ])
    expect(disguised).toBe("You need to ~ ~ your pronunciation a bit more.")
  })

  it("handles 'I am sure we can work out our problems if we talk about them.'", () => {
    const disguised = vm.concealWords("I am sure we can work out our problems if we talk about them.", [ "work", "out" ])
    expect(disguised).toBe("I am sure we can ~ ~ our problems if we talk about them.")
  })

  it("handles 'I hope things will work out well for you in your new job.'", () => {
    const disguised = vm.concealWords("I hope things will work out well for you in your new job.", [ "work", "out" ])
    expect(disguised).toBe("I hope things will ~ ~ well for you in your new job.")
  })

  it("handles 'I've been walking all day so I've worked up a really good appetite.'", () => {
    const disguised = vm.concealWords("I've been walking all day so I've worked up a really good appetite.", [ "work", "up" ])
    expect(disguised).toBe("I've been walking all day so I've ~ed ~ a really good appetite.")
  })

  it("handles 'They tried to enter the pub but they were turned away at the door.'", () => {
    const disguised = vm.concealWords("They tried to enter the pub but they were turned away at the door.", [ "turn", "away" ])
    expect(disguised).toBe("They tried to enter the pub but they were ~ed ~ at the door.")
  })

  it("handles 'Hundreds of people were turned away from the stadium (= because it was full).'", () => {
    const disguised = vm.concealWords("Hundreds of people were turned away from the stadium (= because it was full).", [ "turn", "away" ])
    expect(disguised).toBe("Hundreds of people were ~ed ~ from the stadium (= because it was full).")
  })

  it("handles 'They had nowhere to stay so I couldn't turn them away.'", () => {
    const disguised = vm.concealWords("They had nowhere to stay so I couldn't turn them away.", [ "turn", "away" ])
    expect(disguised).toBe("They had nowhere to stay so I couldn't ~ them ~.")
  })

  it("handles 'He proposed to her but she turned him down.'", () => {
    const disguised = vm.concealWords("He proposed to her but she turned him down.", [ "turn", "down" ])
    expect(disguised).toBe("He proposed to her but she ~ed him ~.")
  })

  it("handles 'Please turn the volume down.'", () => {
    const disguised = vm.concealWords("Please turn the volume down.", [ "turn", "down" ])
    expect(disguised).toBe("Please ~ the volume ~.")
  })

  it("handles 'He turned the lights down low.'", () => {
    const disguised = vm.concealWords("He turned the lights down low.", [ "turn", "down" ])
    expect(disguised).toBe("He ~ed the lights ~ low.")
  })

  it("handles 'Could you turn down the radio a little? I can't hear him on the phone.'", () => {
    const disguised = vm.concealWords("Could you turn down the radio a little? I can't hear him on the phone.", [ "turn", "down" ])
    expect(disguised).toBe("Could you ~ ~ the radio a little? I can't hear him on the phone.")
  })

  it("handles 'to turn off the light'", () => {
    const disguised = vm.concealWords("to turn off the light", [ "turn", "off" ])
    expect(disguised).toBe("to ~ ~ the light")
  })

  it("handles 'They've turned off the water while they repair a burst pipe.'", () => {
    const disguised = vm.concealWords("They've turned off the water while they repair a burst pipe.", [ "turn", "off" ])
    expect(disguised).toBe("They've ~ed ~ the water while they repair a burst pipe.")
  })

  it("handles 'Please turn the television off before you go to bed.'", () => {
    const disguised = vm.concealWords("Please turn the television off before you go to bed.", [ "turn", "off" ])
    expect(disguised).toBe("Please ~ the television ~ before you go to bed.")
  })

  it("handles 'Our factory turns out 100 cars a day.'", () => {
    const disguised = vm.concealWords("Our factory turns out 100 cars a day.", [ "turn", "out" ])
    expect(disguised).toBe("Our factory ~s ~ 100 cars a day.")
  })

  it("handles 'The school has turned out some first-rate students.'", () => {
    const disguised = vm.concealWords("The school has turned out some first-rate students.", [ "turn", "out" ])
    expect(disguised).toBe("The school has ~ed ~ some first-rate students.")
  })

  it("handles 'Now children, turn over to the next page.'", () => {
    const disguised = vm.concealWords("Now children, turn over to the next page.", [ "turn", "over" ])
    expect(disguised).toBe("Now children, ~ ~ to the next page.")
  })

  it("handles 'When I am in trouble I always turn to my brother.'", () => {
    const disguised = vm.concealWords("When I am in trouble I always turn to my brother.", [ "turn", "to" ])
    expect(disguised).toBe("When I am in trouble I always ~ ~ my brother.")
  })

  it("handles 'The fire was allowed to burn unchecked.'", () => {
    const disguised = vm.concealWords("The fire was allowed to burn unchecked.", [ "unchecked" ])
    expect(disguised).toBe("The fire was allowed to burn ~.")
  })

  it("handles 'Tears flowed unchecked down his cheeks.'", () => {
    const disguised = vm.concealWords("Tears flowed unchecked down his cheeks.", [ "unchecked" ])
    expect(disguised).toBe("Tears flowed ~ down his cheeks.")
  })

  it("handles 'hurricane Katrina which devastated the USA is cited as just one example of the kind of environmental and economic havoc that will result from unchecked global warming.'", () => {
    const disguised = vm.concealWords("hurricane Katrina which devastated the USA is cited as just one example of the kind of environmental and economic havoc that will result from unchecked global warming.", [ "unchecked" ])
    expect(disguised).toBe("hurricane Katrina which devastated the USA is cited as just one example of the kind of environmental and economic havoc that will result from ~ global warming.")
  })

  it("handles 'the excretion of toxic substances through the skin'", () => {
    const disguised = vm.concealWords("the excretion of toxic substances through the skin", [ "excrete", "excretion" ])
    expect(disguised).toBe("the ~ of toxic substances through the skin")
  })

  it("handles 'She sets great store by her appearance.'", () => {
    const disguised = vm.concealWords("She sets great store by her appearance.", [ "set", "store", "by" ])
    expect(disguised).toBe("She ~s great ~ ~ her appearance.")
  })

  it("handles 'It is unwise to put too much store by these statistics.'", () => {
    const disguised = vm.concealWords("It is unwise to put too much store by these statistics.", [ "set", "store", "by" ])
    expect(disguised).toBe("It is unwise to put too much ~ ~ these statistics.")
  })

  it("handles 'o sum up regions which are economiacal develop put huge attentions on population's literacy accomplishments, whereas the poorer regions with many problmes like famine don't sets great store by people ability to write and read.'", () => {
    const disguised = vm.concealWords("o sum up regions which are economiacal develop put huge attentions on population's literacy accomplishments, whereas the poorer regions with many problmes like famine don't sets great store by people ability to write and read.", [ "set", "store", "by" ])
    expect(disguised).toBe("o sum up regions which are economiacal develop put huge attentions on population's literacy accomplishments, whereas the poorer regions with many problmes like famine don't ~s great ~ ~ people ability to write and read.")
  })

  it("handles 'Could you just cast (run) your eyes over this report?'", () => {
    const disguised = vm.concealWords("Could you just cast (run) your eyes over this report?", [ "cast", "an", "eye" ])
    expect(disguised).toBe("Could you just ~ (run) your ~s over this report?")
  })

  it("handles 'let casts a subjective eye on the four largest calamities of the 21 century, based on their scale and lives they claimed.'", () => {
    const disguised = vm.concealWords("let casts a subjective eye on the four largest calamities of the 21 century, based on their scale and lives they claimed.", [ "cast", "an", "eye" ])
    expect(disguised).toBe("let ~s a subjective ~ on the four largest calamities of the 21 century, based on their scale and lives they claimed.")
  })

  it("handles 'let casts a subjective eye on the four largest calamities of the 21 century, based on their scale and lives they claimed.'", () => {
    const disguised = vm.concealWords("let casts a subjective eye on the four largest calamities of the 21 century, based on their scale and lives they claimed.", [ "calamity" ])
    expect(disguised).toBe("let casts a subjective eye on the four largest ~s of the 21 century, based on their scale and lives they claimed.")
  })

  it("handles 'Sudan suffered a series of calamities during the 1980s.'", () => {
    const disguised = vm.concealWords("Sudan suffered a series of calamities during the 1980s.", [ "calamity" ])
    expect(disguised).toBe("Sudan suffered a series of ~s during the 1980s.")
  })

  it("handles 'Samples of calamities: draft/draught or flood'", () => {
    const disguised = vm.concealWords("Samples of calamities: draft/draught or flood", [ "calamity" ])
    expect(disguised).toBe("Samples of ~s: draft/draught or flood")
  })

  it("handles 'In some cultures, people traditionally greet each other by rubbing noses.'", () => {
    const disguised = vm.concealWords("In some cultures, people traditionally greet each other by rubbing noses.", [ "rub" ])
    expect(disguised).toBe("In some cultures, people traditionally greet each other by ~ing noses.")
  })

  it("handles 'It sounded like two pieces of wood rubbing together.'", () => {
    const disguised = vm.concealWords("It sounded like two pieces of wood rubbing together.", [ "rub" ])
    expect(disguised).toBe("It sounded like two pieces of wood ~ing together.")
  })

  it("handles 'He set out his objections to the plan'", () => {
    const disguised = vm.concealWords("He set out his objections to the plan", [ "set", "sth", "out" ])
    expect(disguised).toBe("He ~ ~ his objections to the plan")
  })

  it("handles 'She set out the reasons for her resignation in a long letter'", () => {
    const disguised = vm.concealWords("She set out the reasons for her resignation in a long letter", [ "set", "sth", "out" ])
    expect(disguised).toBe("She ~ ~ the reasons for her resignation in a long letter")
  })

  it("handles 'Its conclusion set out a clear, rational basis for exploring the regulation of video games'", () => {
    const disguised = vm.concealWords("Its conclusion set out a clear, rational basis for exploring the regulation of video games", [ "set", "sth", "out" ])
    expect(disguised).toBe("Its conclusion ~ ~ a clear, rational basis for exploring the regulation of video games")
  })

  it("handles 'My sisters were squabbling over what to watch on TV'", () => {
    const disguised = vm.concealWords("My sisters were squabbling over what to watch on TV", [ "squabble", "bicker" ])
    expect(disguised).toBe("My sisters were ~ing over what to watch on TV")
  })

  it("handles 'The ensuing debate, however, has descended into the same old squabbling between partisan fractions'", () => {
    const disguised = vm.concealWords("The ensuing debate, however, has descended into the same old squabbling between partisan fractions", [ "squabble", "bicker" ])
    expect(disguised).toBe("The ensuing debate, however, has descended into the same old ~ing between partisan fractions")
  })

  it("handles 'The country was descending into chaos'", () => {
    const disguised = vm.concealWords("The country was descending into chaos", [ "descend", "into", "sth" ])
    expect(disguised).toBe("The country was ~ing ~ chaos")
  })

  it("handles 'the years preceding the war'", () => {
    const disguised = vm.concealWords("the years preceding the war", [ "precede" ])
    expect(disguised).toBe("the years ~ing the war")
  })

  it("handles 'See the preceding chapter.'", () => {
    const disguised = vm.concealWords("See the preceding chapter.", [ "precede" ])
    expect(disguised).toBe("See the ~ing chapter.")
  })

  it("handles 'The gamble paid off'", () => {
    const disguised = vm.concealWords("The gamble paid off", [ "pay", "off" ])
    expect(disguised).toBe("The gamble ~ ~")
  })

  it("handles 'The hotel is closed for refurbishment'", () => {
    const disguised = vm.concealWords("The hotel is closed for refurbishment", [ "refurbish", "refurbishment" ])
    expect(disguised).toBe("The hotel is closed for ~")
  })

  it("handles 'This is just one of several planned refurbishments'", () => {
    const disguised = vm.concealWords("This is just one of several planned refurbishments", [ "refurbishment" ])
    expect(disguised).toBe("This is just one of several planned ~s")
  })

  it("handles 'Cycle organizations are gearing up for National Bike Week'", () => {
    const disguised = vm.concealWords("Cycle organizations are gearing up for National Bike Week", [ "gear", "sb", "sth", "up", "for", "to" ])
    expect(disguised).toBe("Cycle organizations are ~ing ~ ~ National Bike Week")
  })

  it("handles 'A feasibility study on the proposed new airport'", () => {
    const disguised = vm.concealWords("A feasibility study on the proposed new airport", [ "feasible", "practicable", "feasibility" ])
    expect(disguised).toBe("A ~ study on the proposed new airport")
  })

  it("handles 'I doubt the feasibility of the plan'", () => {
    const disguised = vm.concealWords("I doubt the feasibility of the plan", [ "feasible", "practicable", "feasibility" ])
    expect(disguised).toBe("I doubt the ~ of the plan")
  })

  it("handles 'I mean, it all worked out OK in the end... but I got off to a bad start'", () => {
    const disguised = vm.concealWords("I mean, it all worked out OK in the end... but I got off to a bad start", [ "get", "off", "to", "a", "bad", "start" ])
    expect(disguised).toBe("I mean, it all worked out OK in the end... but I ~ ~ ~ ~ ~ ~")
  })

  it("handles 'I tried to be friendly, but she snubbed me completely'", () => {
    const disguised = vm.concealWords("I tried to be friendly, but she snubbed me completely", [ "snub" ])
    expect(disguised).toBe("I tried to be friendly, but she ~ed me completely")
  })

  it("handles 'She retained her mental faculties (= the ability to think and understand) until the day she died'", () => {
    const disguised = vm.concealWords("She retained her mental faculties (= the ability to think and understand) until the day she died", [ "faculty" ])
    expect(disguised).toBe("She retained her mental ~s (= the ability to think and understand) until the day she died")
  })

  it("handles 'To be in full possession of your faculties (= be able to speak, hear, see, understand, etc.)'", () => {
    const disguised = vm.concealWords("To be in full possession of your faculties (= be able to speak, hear, see, understand, etc.)", [ "faculty" ])
    expect(disguised).toBe("To be in full possession of your ~s (= be able to speak, hear, see, understand, etc.)")
  })

  it("handles 'Intellectual/critical/artistic faculties'", () => {
    const disguised = vm.concealWords("Intellectual/critical/artistic faculties", [ "faculty" ])
    expect(disguised).toBe("Intellectual/critical/artistic ~s")
  })

  it("handles 'The temptation of easy profits'", () => {
    const disguised = vm.concealWords("The temptation of easy profits", [ "tempt", "temptation" ])
    expect(disguised).toBe("The ~ of easy profits")
  })

  it("handles 'To give way to/yield to temptation'", () => {
    const disguised = vm.concealWords("To give way to/yield to temptation", [ "tempt", "temptation" ])
    expect(disguised).toBe("To give way to/yield to ~")
  })

  it("handles 'I couldn't resist the temptation to open the letter'", () => {
    const disguised = vm.concealWords("I couldn't resist the temptation to open the letter", [ "tempt", "temptation" ])
    expect(disguised).toBe("I couldn't resist the ~ to open the letter")
  })

  it("handles 'Don't put temptation in her way by offering her a cigarette'", () => {
    const disguised = vm.concealWords("Don't put temptation in her way by offering her a cigarette", [ "tempt", "temptation" ])
    expect(disguised).toBe("Don't put ~ in her way by offering her a cigarette")
  })

  it("handles 'The rain sent everyone scuttling for cover'", () => {
    const disguised = vm.concealWords("The rain sent everyone scuttling for cover", [ "scuttle" ])
    expect(disguised).toBe("The rain sent everyone ~ing for cover")
  })

  it("handles 'He listened to his wife's bitter reproaches'", () => {
    const disguised = vm.concealWords("He listened to his wife's bitter reproaches", [ "reproach", "reproachful" ])
    expect(disguised).toBe("He listened to his wife's bitter ~s")
  })

  it("handles 'She was doing her best not to sound reproachful'", () => {
    const disguised = vm.concealWords("She was doing her best not to sound reproachful", [ "reproach", "reproachful" ])
    expect(disguised).toBe("She was doing her best not to sound ~")
  })

  it("handles 'The company quickly ramped up production to meet the demand'", () => {
    const disguised = vm.concealWords("The company quickly ramped up production to meet the demand", [ "ramp", "sth", "up" ])
    expect(disguised).toBe("The company quickly ~ed ~ production to meet the demand")
  })

  it("handles 'She was unwilling to believe anyone would stoop so low as to steal a ring from a dead woman's finger'", () => {
    const disguised = vm.concealWords("She was unwilling to believe anyone would stoop so low as to steal a ring from a dead woman's finger", [ "stoop", "so", "low", "as", "to", "do", "sth" ])
    expect(disguised).toBe("She was unwilling ~ believe anyone would ~ ~ ~ ~ ~ steal a ring from a dead woman's finger")
  })

  it("handles 'The pursuit of happiness/knowledge/profit'", () => {
    const disguised = vm.concealWords("The pursuit of happiness/knowledge/profit", [ "pursue", "pursuit" ])
    expect(disguised).toBe("The ~ of happiness/knowledge/profit")
  })

  it("handles 'She travelled the world in pursuit of her dreams'", () => {
    const disguised = vm.concealWords("She travelled the world in pursuit of her dreams", [ "pursue", "pursuit" ])
    expect(disguised).toBe("She travelled the world in ~ of her dreams")
  })

  it("handles 'Jake has been pursuing her (= trying to have a relationship with her) for months'", () => {
    const disguised = vm.concealWords("Jake has been pursuing her (= trying to have a relationship with her) for months", [ "pursue", "pursuit" ])
    expect(disguised).toBe("Jake has been ~ing her (= trying to have a relationship with her) for months")
  })

  it("handles 'We drove away with two police cars in pursuit (= following)'", () => {
    const disguised = vm.concealWords("We drove away with two police cars in pursuit (= following)", [ "pursue", "pursuit" ])
    expect(disguised).toBe("We drove away with two police cars in ~ (= following)")
  })

  it("handles 'I galloped off on my horse with Rosie in hot pursuit (= following quickly behind)'", () => {
    const disguised = vm.concealWords("I galloped off on my horse with Rosie in hot pursuit (= following quickly behind)", [ "pursue", "pursuit" ])
    expect(disguised).toBe("I galloped off on my horse with Rosie in hot ~ (= following quickly behind)")
  })

  it("handles 'The inhibition of growth'", () => {
    const disguised = vm.concealWords("The inhibition of growth", [ "inhibit", "inhibitor", "inhibition" ])
    expect(disguised).toBe("The ~ of growth")
  })

  it("handles 'Vastly superior'", () => {
    const disguised = vm.concealWords("Vastly superior", [ "inferior", "superior" ])
    expect(disguised).toBe("Vastly ~")
  })

  it("handles 'This model is technically superior to its competitors'", () => {
    const disguised = vm.concealWords("This model is technically superior to its competitors", [ "inferior", "superior" ])
    expect(disguised).toBe("This model is technically ~ to its competitors")
  })

  it("handles 'Liverpool were clearly the superior team'", () => {
    const disguised = vm.concealWords("Liverpool were clearly the superior team", [ "inferior", "superior" ])
    expect(disguised).toBe("Liverpool were clearly the ~ team")
  })

  it("handles 'He worked very hard, so when he received his test results he was justifiably proud'", () => {
    const disguised = vm.concealWords("He worked very hard, so when he received his test results he was justifiably proud", [ "justifiable", "justifiably", "legitimate" ])
    expect(disguised).toBe("He worked very hard, so when he received his test results he was ~ proud")
  })

  it("handles 'The university can be justifiably proud of its record'", () => {
    const disguised = vm.concealWords("The university can be justifiably proud of its record", [ "justifiable", "justifiably", "legitimate" ])
    expect(disguised).toBe("The university can be ~ proud of its record")
  })

  it("handles 'the pulsing rhythm of the music'", () => {
    const disguised = vm.concealWords("the pulsing rhythm of the music", [ "pulse" ])
    expect(disguised).toBe("the ~ing rhythm of the music")
  })

  it("handles 'They have travelled the length and breadth of Europe giving concerts.'", () => {
    const disguised = vm.concealWords("They have travelled the length and breadth of Europe giving concerts.", [ "the", "length", "and", "breadth", "of" ])
    expect(disguised).toBe("They have travelled ~ ~ ~ ~ ~ Europe giving concerts.")
  })

  it("handles 'He found her captivating'", () => {
    const disguised = vm.concealWords("He found her captivating", [ "captivate", "enchant", "captivating", "enchanting" ])
    expect(disguised).toBe("He found her ~ing")
  })

  it("handles 'The class caters for all ability ranges'", () => {
    const disguised = vm.concealWords("The class caters for all ability ranges", [ "cater", "for", "sb", "sth" ])
    expect(disguised).toBe("The class ~s ~ all ability ranges")
  })

  it("handles 'There is plenty to see and do and families are particularly well-catered for'", () => {
    const disguised = vm.concealWords("There is plenty to see and do and families are particularly well-catered for", [ "cater", "for", "sb", "sth" ])
    expect(disguised).toBe("There is plenty to see and do and families are particularly well-~ed ~")
  })

  it("handles 'She was sniffing and wiping her eyes with a tissue.'", () => {
    const disguised = vm.concealWords("She was sniffing and wiping her eyes with a tissue.", [ "wipe" ])
    expect(disguised).toBe("She was sniffing and ~ing her eyes with a tissue.")
  })

  it("handles 'You can remove any dirty marks by wiping it with a wet cloth.'", () => {
    const disguised = vm.concealWords("You can remove any dirty marks by wiping it with a wet cloth.", [ "wipe" ])
    expect(disguised).toBe("You can remove any dirty marks by ~ing it with a wet cloth.")
  })

  it("handles 'Over the years, I have grown quite fond of her.'", () => {
    const disguised = vm.concealWords("Over the years, I have grown quite fond of her.", [ "fond", "of" ])
    expect(disguised).toBe("Over the years, I have grown quite ~ ~ her.")
  })

  it("handles 'I've always been very fond of your mother.'", () => {
    const disguised = vm.concealWords("I've always been very fond of your mother.", [ "fond", "of" ])
    expect(disguised).toBe("I've always been very ~ ~ your mother.")
  })

  it("handles 'She was feeling tired and weepy'", () => {
    const disguised = vm.concealWords("She was feeling tired and weepy", [ "weep", "weepy", "wept" ])
    expect(disguised).toBe("She was feeling tired and ~")
  })

  it("handles 'She wept bitter tears of disappointment'", () => {
    const disguised = vm.concealWords("She wept bitter tears of disappointment", [ "weep", "weepy", "wept" ])
    expect(disguised).toBe("She ~ bitter tears of disappointment")
  })

  it("handles 'I wept to see him looking so sick'", () => {
    const disguised = vm.concealWords("I wept to see him looking so sick", [ "weep", "weepy", "wept" ])
    expect(disguised).toBe("I ~ to see him looking so sick")
  })

  it("handles 'He wept for joy'", () => {
    const disguised = vm.concealWords("He wept for joy", [ "weep", "weepy", "wept" ])
    expect(disguised).toBe("He ~ for joy")
  })

  it("handles 'I could have wept thinking about what I'd missed'", () => {
    const disguised = vm.concealWords("I could have wept thinking about what I'd missed", [ "weep", "weepy", "wept" ])
    expect(disguised).toBe("I could have ~ thinking about what I'd missed")
  })

  it("handles 'Weddings always made her feel weepy'", () => {
    const disguised = vm.concealWords("Weddings always made her feel weepy", [ "weep", "weepy", "wept" ])
    expect(disguised).toBe("Weddings always made her feel ~")
  })

  it("handles ''I'm so unhappy!' she wept'", () => {
    const disguised = vm.concealWords("'I'm so unhappy!' she wept", [ "weep", "weepy", "wept" ])
    expect(disguised).toBe("'I'm so unhappy!' she ~")
  })

  it("handles 'She sat in the car, silently fuming at the traffic jam'", () => {
    const disguised = vm.concealWords("She sat in the car, silently fuming at the traffic jam", [ "fume" ])
    expect(disguised).toBe("She sat in the car, silently ~ing at the traffic jam")
  })

  it("handles 'He was fuming with indignation'", () => {
    const disguised = vm.concealWords("He was fuming with indignation", [ "fume" ])
    expect(disguised).toBe("He was ~ing with indignation")
  })

  it("handles 'He was punished for his treacheries'", () => {
    const disguised = vm.concealWords("He was punished for his treacheries", [ "treachery", "treacherous" ])
    expect(disguised).toBe("He was punished for his ~s")
  })

  it("handles 'He was weak, cowardly and treacherous'", () => {
    const disguised = vm.concealWords("He was weak, cowardly and treacherous", [ "treachery", "treacherous" ])
    expect(disguised).toBe("He was weak, cowardly and ~")
  })

  it("handles 'Lying, treacherous words'", () => {
    const disguised = vm.concealWords("Lying, treacherous words", [ "treachery", "treacherous" ])
    expect(disguised).toBe("Lying, ~ words")
  })

  it("handles 'The district is under consideration for designation as a conservation area'", () => {
    const disguised = vm.concealWords("The district is under consideration for designation as a conservation area", [ "designate", "designation" ])
    expect(disguised).toBe("The district is under consideration for ~ as a conservation area")
  })

  it("handles 'The road followed the undulations of the landscape'", () => {
    const disguised = vm.concealWords("The road followed the undulations of the landscape", [ "undulate", "undulation" ])
    expect(disguised).toBe("The road followed the ~s of the landscape")
  })

  it("handles 'A brilliant evocation of childhood in the 1940s'", () => {
    const disguised = vm.concealWords("A brilliant evocation of childhood in the 1940s", [ "evoke", "evocation" ])
    expect(disguised).toBe("A brilliant ~ of childhood in the 1940s")
  })

  it("handles 'The more she struggled, the fiercer he became'", () => {
    const disguised = vm.concealWords("The more she struggled, the fiercer he became", [ "fierce", "fiercely", "fierceness" ])
    expect(disguised).toBe("The more she struggled, the ~er he became")
  })

  it("handles 'She burst into tears and fled'", () => {
    const disguised = vm.concealWords("She burst into tears and fled", [ "flee", "fled" ])
    expect(disguised).toBe("She burst into tears and ~")
  })

  it("handles 'He fled to London after an argument with his family'", () => {
    const disguised = vm.concealWords("He fled to London after an argument with his family", [ "flee", "fled" ])
    expect(disguised).toBe("He ~ to London after an argument with his family")
  })

  it("handles 'The driver had already fled the scene of the accident'", () => {
    const disguised = vm.concealWords("The driver had already fled the scene of the accident", [ "flee", "fled" ])
    expect(disguised).toBe("The driver had already ~ the scene of the accident")
  })

  it("handles 'You're right and I was wrong, he said submissively'", () => {
    const disguised = vm.concealWords("You're right and I was wrong, he said submissively", [ "submissive", "submissively", "submissiveness" ])
    expect(disguised).toBe("You're right and I was wrong, he said ~")
  })

  it("handles 'Troops repelled an attempt to infiltrate the south of the island'", () => {
    const disguised = vm.concealWords("Troops repelled an attempt to infiltrate the south of the island", [ "repel" ])
    expect(disguised).toBe("Troops ~ed an attempt to infiltrate the south of the island")
  })

  it("handles 'They were accused of intimidating people into voting for them'", () => {
    const disguised = vm.concealWords("They were accused of intimidating people into voting for them", [ "intimidate", "intimidation" ])
    expect(disguised).toBe("They were accused of ~ing people into voting for them")
  })

  it("handles 'Camouflage and conspicuousness are in the eye of the beholder'", () => {
    const disguised = vm.concealWords("Camouflage and conspicuousness are in the eye of the beholder", [ "beauty", "is", "in", "the", "eye", "of", "beholder" ])
    expect(disguised).toBe("Camouflage and conspicuousness are ~ ~ ~ ~ ~ ~")
  })

  it("handles 'The fields around had been sown with wheat'", () => {
    const disguised = vm.concealWords("The fields around had been sown with wheat", [ "sow", "sown", "sowed" ])
    expect(disguised).toBe("The fields around had been ~ with wheat")
  })

  it("handles 'Someone who has picture of Opus Dei shaped only by means of watching The Da Vinci Code my no, in fact, known the truth. Dan Brown's novel presenting Opus Dei as a shadowy and sinister (seeming evil or dangerous) force - has been sharply criticized by so many scholars for lies and inaccuracies, that it would be unreasonable to regard it as the only source of information in this aspect.'", () => {
    const disguised = vm.concealWords("Someone who has picture of Opus Dei shaped only by means of watching The Da Vinci Code my no, in fact, known the truth. Dan Brown's novel presenting Opus Dei as a shadowy and sinister (seeming evil or dangerous) force - has been sharply criticized by so many scholars for lies and inaccuracies, that it would be unreasonable to regard it as the only source of information in this aspect.", [ "means", "of" ])
    expect(disguised).toBe("Someone who has picture ~ Opus Dei shaped only by ~ ~ watching The Da Vinci Code my no, in fact, known the truth. Dan Brown's novel presenting Opus Dei as a shadowy and sinister (seeming evil or dangerous) force - has been sharply criticized by so many scholars for lies and inaccuracies, that it would be unreasonable to regard it as the only source ~ information in this aspect.")
  })

  it("handles 'The load was lifted by means of a crane.'", () => {
    const disguised = vm.concealWords("The load was lifted by means of a crane.", [ "means", "of" ])
    expect(disguised).toBe("The load was lifted by ~ ~ a crane.")
  })

  it("handles 'zwrot: by means of'", () => {
    const disguised = vm.concealWords("zwrot: by means of", [ "means", "of" ])
    expect(disguised).toBe("zwrot: by ~ ~")
  })

  it("handles 'Someone who has picture of Opus Dei shaped only by means of watching The Da Vinci Code my no, in fact, known the truth. Dan Brown's novel presenting Opus Dei as a shadowy and sinister (seeming evil or dangerous) force - has been sharply criticized by so many scholars for lies and inaccuracies, that it would be unreasonable to regard it as the only source of information in this aspect.'", () => {
    const disguised = vm.concealWords("Someone who has picture of Opus Dei shaped only by means of watching The Da Vinci Code my no, in fact, known the truth. Dan Brown's novel presenting Opus Dei as a shadowy and sinister (seeming evil or dangerous) force - has been sharply criticized by so many scholars for lies and inaccuracies, that it would be unreasonable to regard it as the only source of information in this aspect.", [ "inaccuracy" ])
    expect(disguised).toBe("Someone who has picture of Opus Dei shaped only by means of watching The Da Vinci Code my no, in fact, known the truth. Dan Brown's novel presenting Opus Dei as a shadowy and sinister (seeming evil or dangerous) force - has been sharply criticized by so many scholars for lies and ~s, that it would be unreasonable to regard it as the only source of information in this aspect.")
  })

  it("handles 'The article is full of inaccuracies.'", () => {
    const disguised = vm.concealWords("The article is full of inaccuracies.", [ "inaccuracy" ])
    expect(disguised).toBe("The article is full of ~s.")
  })

  it("handles 'The policeman chatted amicably to the bystanders'", () => {
    const disguised = vm.concealWords("The policeman chatted amicably to the bystanders", [ "amicable", "amicably" ])
    expect(disguised).toBe("The policeman chatted ~ly to the bystanders")
  })

  it("handles 'Regular jogging promotes the recovery of cardiovascular system, strengthening of immunity and stress reduction. It is managed to run away from your problems. Jogging is a perfect exercise stress, which is foreseen by the nature (all our ancestors sometimes run away from dinosaur, sometimes after the mammoth).'", () => {
    const disguised = vm.concealWords("Regular jogging promotes the recovery of cardiovascular system, strengthening of immunity and stress reduction. It is managed to run away from your problems. Jogging is a perfect exercise stress, which is foreseen by the nature (all our ancestors sometimes run away from dinosaur, sometimes after the mammoth).", [ "foresee" ])
    expect(disguised).toBe("Regular jogging promotes the recovery of cardiovascular system, strengthening of immunity and stress reduction. It is managed to run away from your problems. Jogging is a perfect exercise stress, which is ~ by the nature (all our ancestors sometimes run away from dinosaur, sometimes after the mammoth).")
  })

  it("handles 'The problem tested the ingenuity of even the most imaginative students'", () => {
    const disguised = vm.concealWords("The problem tested the ingenuity of even the most imaginative students", [ "ingenious", "ingenuity", "inventiveness" ])
    expect(disguised).toBe("The problem tested the ~ of even the most imaginative students")
  })

  it("handles 'To have first-hand experience of poverty'", () => {
    const disguised = vm.concealWords("To have first-hand experience of poverty", [ "first-hand", "firsthand" ])
    expect(disguised).toBe("To have ~ experience of poverty")
  })

  it("handles 'A campaign by police to clamp down on street crime'", () => {
    const disguised = vm.concealWords("A campaign by police to clamp down on street crime", [ "clamp", "down", "on", "sb", "sth" ])
    expect(disguised).toBe("A campaign by police to ~ ~ ~ street crime")
  })

  it("handles 'The US government is clamping down on drugs'", () => {
    const disguised = vm.concealWords("The US government is clamping down on drugs", [ "clamp", "down", "on", "sb", "sth" ])
    expect(disguised).toBe("The US government is ~ing ~ ~ drugs")
  })

  it("handles 'Schools will bear the brunt of cuts in government spending'", () => {
    const disguised = vm.concealWords("Schools will bear the brunt of cuts in government spending", [ "bear", "take", "withstand", "the", "brunt", "of", "sth" ])
    expect(disguised).toBe("Schools will ~ ~ ~ ~ cuts in government spending")
  })

  it("handles 'The chamber must withstand the full brunt of deep-see pressure'", () => {
    const disguised = vm.concealWords("The chamber must withstand the full brunt of deep-see pressure", [ "bear", "take", "withstand", "the", "brunt", "of", "sth" ])
    expect(disguised).toBe("~ chamber must ~ ~ full ~ ~ deep-see pressure")
  })

  it("handles 'Abdominal pains'", () => {
    const disguised = vm.concealWords("Abdominal pains", [ "abdomen", "abdominals", "abdominal" ])
    expect(disguised).toBe("~ pains")
  })

  it("handles 'The global financial crisis really started to show its effects in the middle of 2007 and into 2008. Around the world large financial institutions have collapsed and governments in even wealthiest nations have had to come up with rescue package to bail out their financial system.'", () => {
    const disguised = vm.concealWords("The global financial crisis really started to show its effects in the middle of 2007 and into 2008. Around the world large financial institutions have collapsed and governments in even wealthiest nations have had to come up with rescue package to bail out their financial system.", [ "bail", "out" ])
    expect(disguised).toBe("The global financial crisis really started to show its effects in the middle of 2007 and into 2008. Around the world large financial institutions have collapsed and governments in even wealthiest nations have had to come up with rescue package to ~ ~ their financial system.")
  })

  it("handles 'The government had to bail the company out of financial difficulty.'", () => {
    const disguised = vm.concealWords("The government had to bail the company out of financial difficulty.", [ "bail", "out" ])
    expect(disguised).toBe("The government had to ~ the company ~ of financial difficulty.")
  })

  it("handles 'to raise/cut taxes'", () => {
    const disguised = vm.concealWords("to raise/cut taxes", [ "tax" ])
    expect(disguised).toBe("to raise/cut ~s")
  })

  it("handles 'We slid down the grassy slope.'", () => {
    const disguised = vm.concealWords("We slid down the grassy slope.", [ "slide" ])
    expect(disguised).toBe("We ~ down the grassy slope.")
  })

  it("handles 'Don't keep hassling me! I'll do it later'", () => {
    const disguised = vm.concealWords("Don't keep hassling me! I'll do it later", [ "hassle", "bother" ])
    expect(disguised).toBe("Don't keep ~ing me! I'll do it later")
  })

  it("handles 'Your brother's been hassling me for cash'", () => {
    const disguised = vm.concealWords("Your brother's been hassling me for cash", [ "hassle", "bother" ])
    expect(disguised).toBe("Your brother's been ~ing me for cash")
  })

  it("handles 'put/set/turn your mind to something| set your mind on something'", () => {
    const disguised = vm.concealWords("put/set/turn your mind to something| set your mind on something", [ "set", "mind", "on" ])
    expect(disguised).toBe("put/~/turn your ~ to something| ~ your ~ ~ something")
  })

  it("handles 'She could have been a brilliant pianist if she'd put her mind to it.'", () => {
    const disguised = vm.concealWords("She could have been a brilliant pianist if she'd put her mind to it.", [ "set", "mind", "on" ])
    expect(disguised).toBe("She could have been a brilliant pianist if she'd put her ~ to it.")
  })

  it("handles 'Baby Jessica is the apple of her father's eye.'", () => {
    const disguised = vm.concealWords("Baby Jessica is the apple of her father's eye.", [ "apple", "of", "one's", "eye" ])
    expect(disguised).toBe("Baby Jessica is the ~ ~ ~ father's ~.")
  })

  it("handles 'I don't think Jan will come to the bar because she has a bun in the oven.'", () => {
    const disguised = vm.concealWords("I don't think Jan will come to the bar because she has a bun in the oven.", [ "bun", "in", "the", "oven" ])
    expect(disguised).toBe("I don't think Jan will come to ~ bar because she has a ~ ~ ~ ~.")
  })

  it("handles 'I thought I was just going to interview the secretary, but they let me talk to the big cheese himself.'", () => {
    const disguised = vm.concealWords("I thought I was just going to interview the secretary, but they let me talk to the big cheese himself.", [ "big", "cheese" ])
    expect(disguised).toBe("I thought I was just going to interview the secretary, but they let me talk to the ~ ~ himself.")
  })

  it("handles 'Just explain the bread and butter of your report. You don't have to go into details.'", () => {
    const disguised = vm.concealWords("Just explain the bread and butter of your report. You don't have to go into details.", [ "bread", "and", "butter" ])
    expect(disguised).toBe("Just explain the ~ ~ ~ of your report. You don't have to go into details.")
  })

  it("handles 'My husband has had to bring home the bacon ever since I broke my leg.'", () => {
    const disguised = vm.concealWords("My husband has had to bring home the bacon ever since I broke my leg.", [ "bring", "home", "the", "bacon" ])
    expect(disguised).toBe("My husband has had to ~ ~ ~ ~ ever since I broke my leg.")
  })

  it("handles 'We'll have to butter Angie up before we tell her the news about the broken vase.'", () => {
    const disguised = vm.concealWords("We'll have to butter Angie up before we tell her the news about the broken vase.", [ "butter", "someone", "up" ])
    expect(disguised).toBe("We'll have to ~ Angie ~ before we tell her the news about the broken vase.")
  })

  it("handles 'Simon is the first carrot top I've ever gone out with.'", () => {
    const disguised = vm.concealWords("Simon is the first carrot top I've ever gone out with.", [ "carrot", "top" ])
    expect(disguised).toBe("Simon is the first ~ ~ I've ever gone out with.")
  })

  it("handles 'I thought I was afraid of flying, but I was cool as a cucumber all the way to England.'", () => {
    const disguised = vm.concealWords("I thought I was afraid of flying, but I was cool as a cucumber all the way to England.", [ "cool", "as", "a", "cucumber" ])
    expect(disguised).toBe("I thought I was afraid of flying, but I was ~ ~ ~ ~ all the way to England.")
  })

  it("handles 'The mirror is broken and we can't fix it. There's no need to cry spilled milk.'", () => {
    const disguised = vm.concealWords("The mirror is broken and we can't fix it. There's no need to cry spilled milk.", [ "don't", "cry", "over", "spilled", "milk" ])
    expect(disguised).toBe("The mirror is broken and we can't fix it. There's no need to ~ ~ ~.")
  })

  it("handles 'Let's stop for a cup of joe before we head to work'", () => {
    const disguised = vm.concealWords("Let's stop for a cup of joe before we head to work", [ "cup", "of", "joe" ])
    expect(disguised).toBe("Let's stop for a ~ ~ ~ before we head to work")
  })

  it("handles 'opera isn't exactly my cup of tea.'", () => {
    const disguised = vm.concealWords("opera isn't exactly my cup of tea.", [ "cup", "of", "tea" ])
    expect(disguised).toBe("opera isn't exactly my ~ ~ ~.")
  })

  it("handles 'The gang tried to egg us on but we didn't want to fight.'", () => {
    const disguised = vm.concealWords("The gang tried to egg us on but we didn't want to fight.", [ "egg", "someone", "on" ])
    expect(disguised).toBe("The gang tried to ~ us ~ but we didn't want to fight.")
  })

  it("handles 'The kids were full of beans after the circus.'", () => {
    const disguised = vm.concealWords("The kids were full of beans after the circus.", [ "full", "of", "beans" ])
    expect(disguised).toBe("The kids were ~ ~ ~ after the circus.")
  })

  it("handles 'Virtually all students will be exempt from the tax'", () => {
    const disguised = vm.concealWords("Virtually all students will be exempt from the tax", [ "virtual", "virtually" ])
    expect(disguised).toBe("~ all students will be exempt from the tax")
  })

  it("handles 'He virtually admitted he was guilty'", () => {
    const disguised = vm.concealWords("He virtually admitted he was guilty", [ "virtual", "virtually" ])
    expect(disguised).toBe("He ~ admitted he was guilty")
  })

  it("handles 'This year's results are virtually the same as last year's'", () => {
    const disguised = vm.concealWords("This year's results are virtually the same as last year's", [ "virtual", "virtually" ])
    expect(disguised).toBe("This year's results are ~ the same as last year's")
  })

  it("handles 'The red squirrel has become virtually extinct in most of the country'", () => {
    const disguised = vm.concealWords("The red squirrel has become virtually extinct in most of the country", [ "virtual", "virtually" ])
    expect(disguised).toBe("The red squirrel has become ~ extinct in most of the country")
  })

  it("handles 'She performed all her duties conscientiously'", () => {
    const disguised = vm.concealWords("She performed all her duties conscientiously", [ "conscientious", "conscientiously" ])
    expect(disguised).toBe("She performed all her duties ~")
  })

  it("handles 'To bleed profusely'", () => {
    const disguised = vm.concealWords("To bleed profusely", [ "profuse", "profusely" ])
    expect(disguised).toBe("To bleed ~")
  })

  it("handles 'To apologize profusely'", () => {
    const disguised = vm.concealWords("To apologize profusely", [ "profuse", "profusely" ])
    expect(disguised).toBe("To apologize ~")
  })

  it("handles 'The professor's daughter had her college diploma handed to her on a silver platter.'", () => {
    const disguised = vm.concealWords("The professor's daughter had her college diploma handed to her on a silver platter.", [ "handed", "to", "someone", "on", "a", "silver", "platter" ])
    expect(disguised).toBe("The professor's daughter had her college diploma ~ ~ her ~ ~ ~ ~.")
  })

  it("handles 'Angelo is a hard nut to crack when something is bothering him like this.'", () => {
    const disguised = vm.concealWords("Angelo is a hard nut to crack when something is bothering him like this.", [ "hard", "nut", "to", "crack" ])
    expect(disguised).toBe("Angelo is a ~ ~ ~ ~ when something is bothering him like this.")
  })

  it("handles 'Choosing a location for our new store is a hot potato right now.'", () => {
    const disguised = vm.concealWords("Choosing a location for our new store is a hot potato right now.", [ "hot", "potato" ])
    expect(disguised).toBe("Choosing a location for our new store is a ~ ~ right now.")
  })

  it("handles 'The issue of taxing domestic fuel has become a political hot potato.'", () => {
    const disguised = vm.concealWords("The issue of taxing domestic fuel has become a political hot potato.", [ "hot", "potato" ])
    expect(disguised).toBe("The issue of taxing domestic fuel has become a political ~ ~.")
  })

  it("handles 'In a nutshell, I'm having a bad day.'", () => {
    const disguised = vm.concealWords("In a nutshell, I'm having a bad day.", [ "in", "a", "nutshell" ])
    expect(disguised).toBe("~ ~ ~, I'm having ~ bad day.")
  })

  it("handles 'He's absolutely nuts about her.'", () => {
    const disguised = vm.concealWords("He's absolutely nuts about her.", [ "nuts", "about" ])
    expect(disguised).toBe("He's absolutely ~ ~ her.")
  })

  it("handles 'I'm nuts about classical music these days.'", () => {
    const disguised = vm.concealWords("I'm nuts about classical music these days.", [ "nuts", "about" ])
    expect(disguised).toBe("I'm ~ ~ classical music these days.")
  })

  it("handles 'Harry has been out to lunch ever since he lost his job.'", () => {
    const disguised = vm.concealWords("Harry has been out to lunch ever since he lost his job.", [ "out", "to", "lunch" ])
    expect(disguised).toBe("Harry has been ~ ~ ~ ever since he lost his job.")
  })

  it("handles 'Your daughter is one smart cookie. She reads higher than her grade level.'", () => {
    const disguised = vm.concealWords("Your daughter is one smart cookie. She reads higher than her grade level.", [ "one", "smart", "cookie" ])
    expect(disguised).toBe("Your daughter is ~ ~ ~. She reads higher than her grade level.")
  })

  it("handles 'The exam was a piece of cake.'", () => {
    const disguised = vm.concealWords("The exam was a piece of cake.", [ "piece", "of", "cake" ])
    expect(disguised).toBe("The exam was a ~ ~ ~.")
  })

  it("handles 'I've applied for several jobs. I don't want to put all my eggs in one basket.'", () => {
    const disguised = vm.concealWords("I've applied for several jobs. I don't want to put all my eggs in one basket.", [ "put", "all", "of", "ones", "eggs", "in", "one", "basket" ])
    expect(disguised).toBe("I've applied for several jobs. I don't want to ~ ~ my ~ ~ ~ ~.")
  })

  it("handles 'Even though I'm majority in Art, I'm taking a maths course because my Dad says I shouldn't put all of my eggs in one basket.'", () => {
    const disguised = vm.concealWords("Even though I'm majority in Art, I'm taking a maths course because my Dad says I shouldn't put all of my eggs in one basket.", [ "put", "all", "of", "ones", "eggs", "in", "one", "basket" ])
    expect(disguised).toBe("Even though I'm majority ~ Art, I'm taking a maths course because my Dad says I shouldn't ~ ~ ~ my ~ ~ ~ ~.")
  })

  it("handles 'The car was souped up with shiny rims and loud stereo.'", () => {
    const disguised = vm.concealWords("The car was souped up with shiny rims and loud stereo.", [ "soup", "up" ])
    expect(disguised).toBe("The car was ~ed ~ with shiny rims and loud stereo.")
  })

  it("handles 'The new Harry Potter books sold like hot cakes.'", () => {
    const disguised = vm.concealWords("The new Harry Potter books sold like hot cakes.", [ "sell", "like", "hot", "cakes" ])
    expect(disguised).toBe("The new Harry Potter books ~ ~ ~ ~.")
  })

  it("handles 'I wanted to spice things up in the office, so I bought some red and gold paint.'", () => {
    const disguised = vm.concealWords("I wanted to spice things up in the office, so I bought some red and gold paint.", [ "spice", "up" ])
    expect(disguised).toBe("I wanted to ~ things ~ in the office, so I bought some red and gold paint.")
  })

  it("handles 'On Monday, I'm going to spill the beans about my travel plans.'", () => {
    const disguised = vm.concealWords("On Monday, I'm going to spill the beans about my travel plans.", [ "spill", "the", "beans" ])
    expect(disguised).toBe("On Monday, I'm going to ~ ~ ~ about my travel plans.")
  })

  it("handles 'Take Mandy's advice with a pinch of salt. She doesn't always do her research.'", () => {
    const disguised = vm.concealWords("Take Mandy's advice with a pinch of salt. She doesn't always do her research.", [ "take", "sth", "with", "pinch", "of", "salt" ])
    expect(disguised).toBe("~ Mandy's advice ~ a ~ ~ ~. She doesn't always do her research.")
  })

  it("handles 'You're going to have to really use your noodle on this crossword puzzle. It's an extra difficult one.'", () => {
    const disguised = vm.concealWords("You're going to have to really use your noodle on this crossword puzzle. It's an extra difficult one.", [ "use", "your", "noodle" ])
    expect(disguised).toBe("You're going to have to really ~ ~ ~ on this crossword puzzle. It's an extra difficult one.")
  })

  it("handles 'You're going to have to really use your noodle on this crossword puzzle. It's an extra difficult one.'", () => {
    const disguised = vm.concealWords("You're going to have to really use your noodle on this crossword puzzle. It's an extra difficult one.", [ "use", "your", "noodle" ])
    expect(disguised).toBe("You're going to have to really ~ ~ ~ on this crossword puzzle. It's an extra difficult one.")
  })

  it("handles 'Hotel have a limited number of rooms with private facilities which, subject to availability, can be reserved and guaranteed at the time of booking - the supplementary charge shown in the price panel will be added to your account.'", () => {
    const disguised = vm.concealWords("Hotel have a limited number of rooms with private facilities which, subject to availability, can be reserved and guaranteed at the time of booking - the supplementary charge shown in the price panel will be added to your account.", [ "facility" ])
    expect(disguised).toBe("Hotel have a limited number of rooms with private ~s which, subject to availability, can be reserved and guaranteed at the time of booking - the supplementary charge shown in the price panel will be added to your account.")
  })

  it("handles 'll rooms have private facilities (= a private bathroom).'", () => {
    const disguised = vm.concealWords("ll rooms have private facilities (= a private bathroom).", [ "facility" ])
    expect(disguised).toBe("ll rooms have private ~s (= a private bathroom).")
  })

  it("handles 'shopping/banking/cooking facilities'", () => {
    const disguised = vm.concealWords("shopping/banking/cooking facilities", [ "facility" ])
    expect(disguised).toBe("shopping/banking/cooking ~s")
  })

  it("handles 'sports/leisure facilities'", () => {
    const disguised = vm.concealWords("sports/leisure facilities", [ "facility" ])
    expect(disguised).toBe("sports/leisure ~s")
  })

  it("handles 'Nor would you suspect the hidden perils of ordinary household sodium peroxide. A dramatic reenactment of what happeend in one home is given a fire-prevention demonstration by an insurance company. A small amount of the powder is mixed in a bowl of sawdust (trociny). Water is added, and in a moment the content of the bowl blaze up fiercely.'", () => {
    const disguised = vm.concealWords("Nor would you suspect the hidden perils of ordinary household sodium peroxide. A dramatic reenactment of what happeend in one home is given a fire-prevention demonstration by an insurance company. A small amount of the powder is mixed in a bowl of sawdust (trociny). Water is added, and in a moment the content of the bowl blaze up fiercely.", [ "blaze", "up" ])
    expect(disguised).toBe("Nor would you suspect the hidden perils of ordinary household sodium peroxide. A dramatic reenactment of what happeend in one home is given a fire-prevention demonstration by an insurance company. A small amount of the powder is mixed in a bowl of sawdust (trociny). Water is added, and in a moment the content of the bowl ~ ~ fiercely.")
  })

  it("handles 'Nor would you suspect the hidden perils of ordinary household sodium peroxide. A dramatic reenactment of what happeend in one home is given a fire-prevention demonstration by an insurance company. A small amount of the powder is mixed in a bowl of sawdust (trociny). Water is added, and in a moment the content of the bowl blaze up fiercely. '", () => {
    const disguised = vm.concealWords("Nor would you suspect the hidden perils of ordinary household sodium peroxide. A dramatic reenactment of what happeend in one home is given a fire-prevention demonstration by an insurance company. A small amount of the powder is mixed in a bowl of sawdust (trociny). Water is added, and in a moment the content of the bowl blaze up fiercely.", [ "fierce", "fiercely", "fierceness" ])
    expect(disguised).toBe("Nor would you suspect the hidden perils of ordinary household sodium peroxide. A dramatic reenactment of what happeend in one home is given a fire-prevention demonstration by an insurance company. A small amount of the powder is mixed in a bowl of sawdust (trociny). Water is added, and in a moment the content of the bowl blaze up ~. ")
  })

  it("handles 'to rid yourself of guilt'", () => {
    const disguised = vm.concealWords("to rid yourself of guilt", [ "rid", "of" ])
    expect(disguised).toBe("to ~ yourself ~ guilt")
  })

  it("handles 'He wanted to rid himself of the burden of the secret.'", () => {
    const disguised = vm.concealWords("He wanted to rid himself of the burden of the secret.", [ "rid", "of" ])
    expect(disguised).toBe("He wanted to ~ himself ~ the burden ~ the secret.")
  })

  it("handles 'get rid of sharp toys'", () => {
    const disguised = vm.concealWords("get rid of sharp toys", [ "rid", "of" ])
    expect(disguised).toBe("get ~ ~ sharp toys")
  })

  it("handles 'She slipped over on the ice and broke her leg.'", () => {
    const disguised = vm.concealWords("She slipped over on the ice and broke her leg.", [ "slip" ])
    expect(disguised).toBe("She ~ed over on the ice and broke her leg.")
  })

  it("handles 'As I ran up the stairs, my foot slipped and I fell.'", () => {
    const disguised = vm.concealWords("As I ran up the stairs, my foot slipped and I fell.", [ "slip" ])
    expect(disguised).toBe("As I ran up the stairs, my foot ~ed and I fell.")
  })

  it("handles 'income = financial gain, accruing over a period of time'", () => {
    const disguised = vm.concealWords("income = financial gain, accruing over a period of time", [ "accrue" ])
    expect(disguised).toBe("income = financial gain, ~ing over a period of time")
  })

  it("handles 'a rate of 26.4% APR'", () => {
    const disguised = vm.concealWords("a rate of 26.4% APR", [ "annual", "percentage", "rate" ])
    expect(disguised).toBe("a ~ of 26.4% APR")
  })

  it("handles 'These delicate plants need careful nurturing.'", () => {
    const disguised = vm.concealWords("These delicate plants need careful nurturing.", [ "nurture" ])
    expect(disguised).toBe("These delicate plants need careful ~ing.")
  })

  it("handles 'I'm sorry I didn't tell you. It completely slipped my mind.'", () => {
    const disguised = vm.concealWords("I'm sorry I didn't tell you. It completely slipped my mind.", [ "it", "slipped", "my", "mind" ])
    expect(disguised).toBe("I'm sorry I didn't tell you. ~ completely ~ ~ ~.")
  })

  it("handles 'ease - beztroskość'", () => {
    const disguised = vm.concealWords("ease - beztroskość", [ "put", "your", "mind", "at", "ease" ])
    expect(disguised).toBe("~ - beztroskość")
  })

  it("handles 'Skipping meals can lead to overeating as you will be much hungier later, so be sure to eat regularly if you want to curb your appetite.'", () => {
    const disguised = vm.concealWords("Skipping meals can lead to overeating as you will be much hungier later, so be sure to eat regularly if you want to curb your appetite.", [ "skip" ])
    expect(disguised).toBe("~ing meals can lead to overeating as you will be much hungier later, so be sure to eat regularly if you want to curb your appetite.")
  })

  it("handles 'I sometimes get worried in this job. Having said that, I enjoy doing it, it's a challenge.'", () => {
    const disguised = vm.concealWords("I sometimes get worried in this job. Having said that, I enjoy doing it, it's a challenge.", [ "having", "said", "that" ])
    expect(disguised).toBe("I sometimes get worried in this job. ~ ~ ~, I enjoy doing it, it's a challenge.")
  })

  it("handles 'Nuclear power has its problems. However, having said that, many people believe it is the energy source of the future.'", () => {
    const disguised = vm.concealWords("Nuclear power has its problems. However, having said that, many people believe it is the energy source of the future.", [ "having", "said", "that" ])
    expect(disguised).toBe("Nuclear power has its problems. However, ~ ~ ~, many people believe it is the energy source of the future.")
  })

  it("handles 'I was surprised, to say the least.'", () => {
    const disguised = vm.concealWords("I was surprised, to say the least.", [ "to", "say", "the", "least" ])
    expect(disguised).toBe("I was surprised, ~ ~ ~ ~.")
  })

  it("handles 'I know you're upset, but when all's said and done it isn't exactly a disaster.'", () => {
    const disguised = vm.concealWords("I know you're upset, but when all's said and done it isn't exactly a disaster.", [ "when", "all", "is", "said", "and", "done" ])
    expect(disguised).toBe("I know you're upset, but ~ ~'s ~ ~ ~ it isn't exactly a disaster.")
  })

  it("handles 'When all is said and done, there is little we can do to save the environment without the full support of industry and the government.'", () => {
    const disguised = vm.concealWords("When all is said and done, there is little we can do to save the environment without the full support of industry and the government.", [ "when", "all", "is", "said", "and", "done" ])
    expect(disguised).toBe("~ ~ ~ ~ ~ ~, there ~ little we can do to save the environment without the full support of industry ~ the government.")
  })

  it("handles 'There is something to be said for switching to solar energy, although it is still too expensive for many people.'", () => {
    const disguised = vm.concealWords("There is something to be said for switching to solar energy, although it is still too expensive for many people.", [ "there", "is", "something", "to", "be", "said", "for" ])
    expect(disguised).toBe("~ ~ ~ ~ ~ ~ ~ switching ~ solar energy, although it ~ still too expensive ~ many people.")
  })

  it("handles '‘He's in a bad mood today.’ ‘You can say that again!’'", () => {
    const disguised = vm.concealWords("‘He's in a bad mood today.’ ‘You can say that again!’", [ "you", "can", "say", "that", "again" ])
    expect(disguised).toBe("‘He's in a bad mood today.’ ‘~ ~ ~ ~ ~!’")
  })

  it("handles 'The problem, needless to say, is the cost involved.'", () => {
    const disguised = vm.concealWords("The problem, needless to say, is the cost involved.", [ "needless", "to", "say" ])
    expect(disguised).toBe("The problem, ~ ~ ~, is the cost involved.")
  })

  it("handles 'The tanker spilled 5000 megalitres of oil into the ocean. Needles to say, this had a devastating effect on marine life in the area.'", () => {
    const disguised = vm.concealWords("The tanker spilled 5000 megalitres of oil into the ocean. Needles to say, this had a devastating effect on marine life in the area.", [ "needless", "to", "say" ])
    expect(disguised).toBe("The tanker spilled 5000 megalitres of oil into the ocean. Needles ~ ~, this had a devastating effect on marine life in the area.")
  })

  it("handles 'three days from now, that is to say on Friday'", () => {
    const disguised = vm.concealWords("three days from now, that is to say on Friday", [ "that", "is", "to", "say" ])
    expect(disguised).toBe("three days from now, ~ ~ ~ ~ on Friday")
  })

  it("handles 'The two men were conversing on music and opera.'", () => {
    const disguised = vm.concealWords("The two men were conversing on music and opera.", [ "converse" ])
    expect(disguised).toBe("The two men were ~ing on music and opera.")
  })

  it("handles 'a week/month/year in advance'", () => {
    const disguised = vm.concealWords("a week/month/year in advance", [ "in", "advance" ])
    expect(disguised).toBe("a week/month/year ~ ~")
  })

  it("handles 'It's cheaper if you book the tickets in advance.'", () => {
    const disguised = vm.concealWords("It's cheaper if you book the tickets in advance.", [ "in", "advance" ])
    expect(disguised).toBe("It's cheaper if you book the tickets ~ ~.")
  })

  it("handles 'It is difficult to get tickets at that time of year so we booked ours well in advance.'", () => {
    const disguised = vm.concealWords("It is difficult to get tickets at that time of year so we booked ours well in advance.", [ "in", "advance" ])
    expect(disguised).toBe("It is difficult to get tickets at that time of year so we booked ours well ~ ~.")
  })

  it("handles 'sparkling eyes'", () => {
    const disguised = vm.concealWords("sparkling eyes", [ "sparkle" ])
    expect(disguised).toBe("~ing eyes")
  })

  it("handles 'He is impressive player to watch, but he is all brawn and no brain.'", () => {
    const disguised = vm.concealWords("He is impressive player to watch, but he is all brawn and no brain.", [ "all", "brawn", "and", "no", "brain" ])
    expect(disguised).toBe("He is impressive player to watch, but he is ~ ~ ~ ~ ~.")
  })

  it("handles 'Because of all the electoral promises he made, which so far he has failed to keep, many people call the new president all sizzle and no steak.'", () => {
    const disguised = vm.concealWords("Because of all the electoral promises he made, which so far he has failed to keep, many people call the new president all sizzle and no steak.", [ "all", "sizzle", "and", "no", "steak" ])
    expect(disguised).toBe("Because of ~ the electoral promises he made, which so far he has failed to keep, many people call the new president ~ ~ ~ ~ ~.")
  })

  it("handles 'The guy is such an armchair critic, no experience but plenty of advice!.'", () => {
    const disguised = vm.concealWords("The guy is such an armchair critic, no experience but plenty of advice!.", [ "Armchair", "critic" ])
    expect(disguised).toBe("The guy is such an ~ ~, no experience but plenty of advice!.")
  })

  it("handles 'A suprising number of adventure books are bought by armchair traveller.'", () => {
    const disguised = vm.concealWords("A suprising number of adventure books are bought by armchair traveller.", [ "Armchair", "traveller" ])
    expect(disguised).toBe("A suprising number of adventure books are bought by ~ ~.")
  })

  it("handles 'I don't want my son to be friends with Bobby Smith. Bobby's a bad egg.'", () => {
    const disguised = vm.concealWords("I don't want my son to be friends with Bobby Smith. Bobby's a bad egg.", [ "bad", "egg" ])
    expect(disguised).toBe("I don't want my son to be friends with Bobby Smith. Bobby's a ~ ~.")
  })

  it("handles 'He doesn't have a mobile phone. She is completely behind the times.'", () => {
    const disguised = vm.concealWords("He doesn't have a mobile phone. She is completely behind the times.", [ "Behind", "the", "times" ])
    expect(disguised).toBe("He doesn't have a mobile phone. She is completely ~ ~ ~.")
  })

  it("handles 'She has never has to worry about money, she was born with a silver spoon in her mounth.'", () => {
    const disguised = vm.concealWords("She has never has to worry about money, she was born with a silver spoon in her mounth.", [ "Born", "with", "a", "silver", "spoon", "in", "one's", "mouth" ])
    expect(disguised).toBe("She has never has to worry about money, she was ~ ~ ~ ~ ~ ~ ~ mounth.")
  })

  it("handles 'Ever since she got promotion, she thinks she is the cat's whiskers!.'", () => {
    const disguised = vm.concealWords("Ever since she got promotion, she thinks she is the cat's whiskers!.", [ "cat's", "whiskers" ])
    expect(disguised).toBe("Ever since she got promotion, she thinks she is the ~ ~!.")
  })

  it("handles 'James is a chip off the old block - he reacts exactly the same way as his father.'", () => {
    const disguised = vm.concealWords("James is a chip off the old block - he reacts exactly the same way as his father.", [ "A", "chip", "off", "the", "old", "block" ])
    expect(disguised).toBe("James is ~ ~ ~ ~ ~ ~ - he reacts exactly ~ same way ~s his father.")
  })

  it("handles 'I started studying medicine but I quickly realized I wasn't cut out for it.'", () => {
    const disguised = vm.concealWords("I started studying medicine but I quickly realized I wasn't cut out for it.", [ "Not", "cut", "out", "for", "something" ])
    expect(disguised).toBe("I started studying medicine but I quickly realized I wasn't ~ ~ ~ it.")
  })

  it("handles 'The new manager wants to reduce costs by cutting out the dead wood.'", () => {
    const disguised = vm.concealWords("The new manager wants to reduce costs by cutting out the dead wood.", [ "Dead", "wood" ])
    expect(disguised).toBe("The new manager wants to reduce costs by cutting out the ~ ~.")
  })

  it("handles 'She arrived at the reception dressed to kill!'", () => {
    const disguised = vm.concealWords("She arrived at the reception dressed to kill!", [ "dressed", "to", "kill" ])
    expect(disguised).toBe("She arrived at the reception ~ ~ ~!")
  })

  it("handles 'Tony will help us find it - he's got eagle eyes!'", () => {
    const disguised = vm.concealWords("Tony will help us find it - he's got eagle eyes!", [ "eagle", "eyes" ])
    expect(disguised).toBe("Tony will help us find it - he's got ~ ~!")
  })

  it("handles 'Every Tom, Dick and Harry has a credit card these days!'", () => {
    const disguised = vm.concealWords("Every Tom, Dick and Harry has a credit card these days!", [ "every", "Tom,", "Dick", "and", "Harry" ])
    expect(disguised).toBe("~ ~ ~ ~ ~ has a credit card these days!")
  })

  it("handles 'Of course Dad will notice the cratch on his car - he's got eyes like a hawk!'", () => {
    const disguised = vm.concealWords("Of course Dad will notice the cratch on his car - he's got eyes like a hawk!", [ "eyes", "like", "a", "hawk" ])
    expect(disguised).toBe("Of course Dad will notice the cratch on his car - he's got ~ ~ ~ ~!")
  })

  it("handles 'Not only was he rude but he had a face like a bulldog chewing a wasp!'", () => {
    const disguised = vm.concealWords("Not only was he rude but he had a face like a bulldog chewing a wasp!", [ "face", "like", "a", "bulldog", "chewing", "wasp" ])
    expect(disguised).toBe("Not only was he rude but he had ~ ~ ~ ~ ~ ~ ~ ~!")
  })

  it("handles 'When Dad is really angry, he has face like thunder!'", () => {
    const disguised = vm.concealWords("When Dad is really angry, he has face like thunder!", [ "face", "like", "thunder" ])
    expect(disguised).toBe("When Dad is really angry, he has ~ ~ ~!")
  })

  it("handles 'The poor guy has a face only a mother could love.'", () => {
    const disguised = vm.concealWords("The poor guy has a face only a mother could love.", [ "face", "only", "a", "mother", "could", "love" ])
    expect(disguised).toBe("The poor guy has ~ ~ ~ ~ ~ ~ ~.")
  })

  it("handles 'The salesman was a fast talker and persuaded the old lady to buy a new washing machine.'", () => {
    const disguised = vm.concealWords("The salesman was a fast talker and persuaded the old lady to buy a new washing machine.", [ "fast", "talker" ])
    expect(disguised).toBe("The salesman was a ~ ~ and persuaded the old lady to buy a new washing machine.")
  })

  it("handles 'Everyone seemed to have a specific role expect me. I felt like a fifth wheel.'", () => {
    const disguised = vm.concealWords("Everyone seemed to have a specific role expect me. I felt like a fifth wheel.", [ "fifth", "wheel" ])
    expect(disguised).toBe("Everyone seemed to have a specific role expect me. I felt like a ~ ~.")
  })

  it("handles 'He looked tired and had a five o'clock shadow.'", () => {
    const disguised = vm.concealWords("He looked tired and had a five o'clock shadow.", [ "five", "o'clock", "shadow" ])
    expect(disguised).toBe("He looked tired and had a ~ ~ ~.")
  })

  it("handles 'My grandpa is very fixed in their ways!'", () => {
    const disguised = vm.concealWords("My grandpa is very fixed in their ways!", [ "fixed", "in", "your", "way" ])
    expect(disguised).toBe("My grandpa is very ~ ~ their ~s!")
  })

  it("handles 'Don't listen to Tony! He is full of hot air!'", () => {
    const disguised = vm.concealWords("Don't listen to Tony! He is full of hot air!", [ "full", "of", "hot", "air" ])
    expect(disguised).toBe("Don't listen to Tony! He is ~ ~ ~ ~!")
  })

  it("handles 'He is not listen to the teacher - he is got his head in the clouds all the time!'", () => {
    const disguised = vm.concealWords("He is not listen to the teacher - he is got his head in the clouds all the time!", [ "have", "head", "in", "the", "clouds" ])
    expect(disguised).toBe("He is not listen to ~ teacher - he is got his ~ ~ ~ ~ all ~ time!")
  })

  it("handles 'hen she heard Emily warning her little brother to stay out of trouble, her mum thought: That's an old head on young shoulders.'", () => {
    const disguised = vm.concealWords("hen she heard Emily warning her little brother to stay out of trouble, her mum thought: That's an old head on young shoulders.", [ "old", "head", "on", "young", "shoulders" ])
    expect(disguised).toBe("hen she heard Emily warning her little brother to stay out of trouble, her mum thought: That's an ~ ~ ~ ~ ~.")
  })

  it("handles 'So you play the saxophone in a club on Saturday nights - you really hide your light under a bushel, don't you!'", () => {
    const disguised = vm.concealWords("So you play the saxophone in a club on Saturday nights - you really hide your light under a bushel, don't you!", [ "hide", "one's", "light", "under", "a", "bushel" ])
    expect(disguised).toBe("So you play the saxophone in ~ club on Saturday nights - you really ~ ~ ~ ~ ~ ~, don't you!")
  })

  it("handles 'I expected to negotiate with the sales manager but the chairman turned up - now he's a horse of a different colour!.'", () => {
    const disguised = vm.concealWords("I expected to negotiate with the sales manager but the chairman turned up - now he's a horse of a different colour!.", [ "horse", "of", "a", "different", "colour" ])
    expect(disguised).toBe("I expected to negotiate with the sales manager but the chairman turned up - now he's ~ ~ ~ ~ ~ ~!.")
  })

  it("handles 'He is efficient althought he look as he is just off the boat'", () => {
    const disguised = vm.concealWords("He is efficient althought he look as he is just off the boat", [ "just", "off", "the", "boat" ])
    expect(disguised).toBe("He is efficient althought he look as he is ~ ~ ~ ~")
  })

  it("handles 'And now, last but not least, here is the final candidate!'", () => {
    const disguised = vm.concealWords("And now, last but not least, here is the final candidate!", [ "last", "but", "not", "least" ])
    expect(disguised).toBe("And now, ~ ~ ~ ~, here is the final candidate!")
  })

  it("handles 'I am so glad we invited Caroline. She was the life and soul of the party.'", () => {
    const disguised = vm.concealWords("I am so glad we invited Caroline. She was the life and soul of the party.", [ "life", "and", "soul", "of", "the", "party" ])
    expect(disguised).toBe("I am so glad we invited Caroline. She was ~ ~ ~ ~ ~ ~ ~.")
  })

  it("handles 'Things have brightened up since Charlie arrived. He is a real live wire.'", () => {
    const disguised = vm.concealWords("Things have brightened up since Charlie arrived. He is a real live wire.", [ "live", "wire" ])
    expect(disguised).toBe("Things have brightened up since Charlie arrived. He is a real ~ ~.")
  })

  it("handles 'She is a bit long in the tooth for a cabaret dancer isn't she?'", () => {
    const disguised = vm.concealWords("She is a bit long in the tooth for a cabaret dancer isn't she?", [ "long", "in", "the", "tooth" ])
    expect(disguised).toBe("She is a bit ~ ~ ~ ~ for a cabaret dancer isn't she?")
  })

  it("handles 'It was a mistake to chose a pretty young girl to play the witch. She didn't look the part at all.'", () => {
    const disguised = vm.concealWords("It was a mistake to chose a pretty young girl to play the witch. She didn't look the part at all.", [ "look", "the", "part" ])
    expect(disguised).toBe("It was a mistake to chose a pretty young girl to play ~ witch. She didn't ~ ~ ~ at all.")
  })

  it("handles 'The little girl looked a picture in her new dress'", () => {
    const disguised = vm.concealWords("The little girl looked a picture in her new dress", [ "look", "a", "picture" ])
    expect(disguised).toBe("The little girl ~ed ~ ~ in her new dress")
  })

  it("handles 'Nice to see you again Mr.Brown. I must say you look the picture of health.'", () => {
    const disguised = vm.concealWords("Nice to see you again Mr.Brown. I must say you look the picture of health.", [ "look", "the", "picture", "of", "health" ])
    expect(disguised).toBe("Nice to see you again Mr.Brown. I must say you ~ ~ ~ ~ ~.")
  })

  it("handles 'She look a sight in that dress!'", () => {
    const disguised = vm.concealWords("She look a sight in that dress!", [ "look", "a", "sight" ])
    expect(disguised).toBe("She ~ ~ ~ in that dress!")
  })

  it("handles 'Barry is an excellent tennis player, but he met his match in William.'", () => {
    const disguised = vm.concealWords("Barry is an excellent tennis player, but he met his match in William.", [ "find", "meet", "your", "match" ])
    expect(disguised).toBe("Barry is an excellent tennis player, but he ~ his ~ in William.")
  })

  it("handles 'My son and his friends are all mouse potatoes - constantly glued to the computer!'", () => {
    const disguised = vm.concealWords("My son and his friends are all mouse potatoes - constantly glued to the computer!", [ "mouse", "potato" ])
    expect(disguised).toBe("My son and his friends are all ~ ~s - constantly glued to the computer!")
  })

  it("handles 'He keep saying he's going to resign and travel around the world, but he's all mouth and no trousers.'", () => {
    const disguised = vm.concealWords("He keep saying he's going to resign and travel around the world, but he's all mouth and no trousers.", [ "all", "mouth", "and", "no", "trousers" ])
    expect(disguised).toBe("He keep saying he's going to resign ~ travel around the world, but he's ~ ~ ~ ~ ~.")
  })

  it("handles 'His name is mud now after the revelations (ujawnienie) in the newspaper.'", () => {
    const disguised = vm.concealWords("His name is mud now after the revelations (ujawnienie) in the newspaper.", [ "your", "name", "is", "mud" ])
    expect(disguised).toBe("His ~ ~ ~ now after the revelations (ujawnienie) in the newspaper.")
  })

  it("handles 'He thinks his refusal to join the team will cause problem, but there are alternatives... he's not the only pebble on the beach.'", () => {
    const disguised = vm.concealWords("He thinks his refusal to join the team will cause problem, but there are alternatives... he's not the only pebble on the beach.", [ "not", "only", "pebble", "on", "the", "beach" ])
    expect(disguised).toBe("He thinks his refusal to join ~ team will cause problem, but there are alternatives... he's ~ ~ ~ly ~ ~ ~ ~.")
  })

  it("handles 'A receptionist greeted customers with a plastic smile'", () => {
    const disguised = vm.concealWords("A receptionist greeted customers with a plastic smile", [ "plastic", "smile" ])
    expect(disguised).toBe("A receptionist greeted customers with a ~ ~")
  })

  it("handles 'He sat with a poker face all through the show, revealing nothing of his thoughts.'", () => {
    const disguised = vm.concealWords("He sat with a poker face all through the show, revealing nothing of his thoughts.", [ "poker", "face" ])
    expect(disguised).toBe("He sat with a ~ ~ all through the show, revealing nothing of his thoughts.")
  })

  it("handles 'When he won first prize, was as proud as a peacock!'", () => {
    const disguised = vm.concealWords("When he won first prize, was as proud as a peacock!", [ "proud", "as", "a", "peacock" ])
    expect(disguised).toBe("When he won first prize, was ~ ~ ~ ~ ~!")
  })

  it("handles 'He makes me nervous - he is got such a quick temper.'", () => {
    const disguised = vm.concealWords("He makes me nervous - he is got such a quick temper.", [ "have", "a", "quick", "temper" ])
    expect(disguised).toBe("He makes me nervous - he is got such ~ ~ ~.")
  })

  it("handles 'It is said that in any profession there's always a rotten apple.'", () => {
    const disguised = vm.concealWords("It is said that in any profession there's always a rotten apple.", [ "rotten", "apple" ])
    expect(disguised).toBe("It is said that in any profession there's always a ~ ~.")
  })

  it("handles 'After just a few lessons my grandma was ready to join the silver surfer'", () => {
    const disguised = vm.concealWords("After just a few lessons my grandma was ready to join the silver surfer", [ "silver", "surfer" ])
    expect(disguised).toBe("After just a few lessons my grandma was ready to join the ~ ~")
  })

  it("handles 'Come on! Don't be such a wet blanket!'", () => {
    const disguised = vm.concealWords("Come on! Don't be such a wet blanket!", [ "a", "wet", "blanket" ])
    expect(disguised).toBe("Come on! Don't be such ~ ~ ~!")
  })

  it("handles 'As regards our political opinions, we're worlds apart!'", () => {
    const disguised = vm.concealWords("As regards our political opinions, we're worlds apart!", [ "worlds", "apart" ])
    expect(disguised).toBe("As regards our political opinions, we're ~ ~!")
  })

  it("handles 'That man is an slippery as an eel. He was arrested for the several times but was never convicted.'", () => {
    const disguised = vm.concealWords("That man is an slippery as an eel. He was arrested for the several times but was never convicted.", [ "slippery", "as", "an", "eel" ])
    expect(disguised).toBe("That man is ~ ~ ~ ~ ~. He was arrested for the several times but was never convicted.")
  })

  it("handles 'The people seized a large quantity of drugs and some small fry, but not the organizers they were hoping to catch.'", () => {
    const disguised = vm.concealWords("The people seized a large quantity of drugs and some small fry, but not the organizers they were hoping to catch.", [ "small", "fry" ])
    expect(disguised).toBe("The people seized a large quantity of drugs and some ~ ~, but not the organizers they were hoping to catch.")
  })

  it("handles 'some smart alec interrupted the game claiming that the answers were incorrect!'", () => {
    const disguised = vm.concealWords("some smart alec interrupted the game claiming that the answers were incorrect!", [ "smart", "alec" ])
    expect(disguised).toBe("some ~ ~ interrupted the game claiming that the answers were incorrect!")
  })

  it("handles 'Julie is constantly out and about; she's a real social butterfly'", () => {
    const disguised = vm.concealWords("Julie is constantly out and about; she's a real social butterfly", [ "social", "butterfly" ])
    expect(disguised).toBe("Julie is constantly out and about; she's a real ~ ~")
  })

  it("handles 'Sarah is the splitting image of her mother'", () => {
    const disguised = vm.concealWords("Sarah is the splitting image of her mother", [ "splitting", "image" ])
    expect(disguised).toBe("Sarah is the ~ ~ of her mother")
  })

  it("handles 'You can leave the keys with Andy. He is as straight as an arrow.'", () => {
    const disguised = vm.concealWords("You can leave the keys with Andy. He is as straight as an arrow.", [ "straight", "as", "an", "arrow" ])
    expect(disguised).toBe("You can leave the keys with Andy. He is ~ ~ ~ ~ ~.")
  })

  it("handles 'When my grandfa invited us for dinner, he used to sit straight as a ramrod at the head of the table'", () => {
    const disguised = vm.concealWords("When my grandfa invited us for dinner, he used to sit straight as a ramrod at the head of the table", [ "straight", "as", "a", "ramrod" ])
    expect(disguised).toBe("When my grandfa invited us for dinner, he used to sit ~ ~ ~ ~ at the head of the table")
  })

  it("handles 'His friends advised him to accept the offer, but you know Jack - he's as stubborn as a mule!'", () => {
    const disguised = vm.concealWords("His friends advised him to accept the offer, but you know Jack - he's as stubborn as a mule!", [ "as", "stubborn", "a", "mule" ])
    expect(disguised).toBe("His friends advised him to accept the offer, but you know Jack - he's ~ ~ ~ ~ ~!")
  })

  it("handles 'She is top dog in cosmetics today!'", () => {
    const disguised = vm.concealWords("She is top dog in cosmetics today!", [ "top", "dog" ])
    expect(disguised).toBe("She is ~ ~ in cosmetics today!")
  })

  it("handles 'we were served a steak as tough as old boots'", () => {
    const disguised = vm.concealWords("we were served a steak as tough as old boots", [ "tough", "as", "old", "boots" ])
    expect(disguised).toBe("we were served a steak ~ ~ ~ ~ ~")
  })

  it("handles 'I am worried about Jason's future. He is a tough cookie!'", () => {
    const disguised = vm.concealWords("I am worried about Jason's future. He is a tough cookie!", [ "a", "tough", "cookie" ])
    expect(disguised).toBe("I am worried about Jason's future. He is ~ ~ ~!")
  })

  it("handles 'Have you seen the new neighbour's dog? It's as ugly as sin!'", () => {
    const disguised = vm.concealWords("Have you seen the new neighbour's dog? It's as ugly as sin!", [ "ugly", "as", "sin" ])
    expect(disguised).toBe("Have you seen the new neighbour's dog? It's ~ ~ ~ ~!")
  })

  it("handles 'dispose of litter in the bins provided = drop a litter'", () => {
    const disguised = vm.concealWords("dispose of litter in the bins provided = drop a litter", [ "dispose", "of" ])
    expect(disguised).toBe("~ ~ litter in the bins provided = drop a litter")
  })

  it("handles 'the difficulties of disposing of nuclear waste'", () => {
    const disguised = vm.concealWords("the difficulties of disposing of nuclear waste", [ "dispose", "of" ])
    expect(disguised).toBe("the difficulties ~ ~ing ~ nuclear waste")
  })

  it("handles 'Many of the houses lacked even basic amenities (= baths, showers, hot water, etc.).'", () => {
    const disguised = vm.concealWords("Many of the houses lacked even basic amenities (= baths, showers, hot water, etc.).", [ "amenity" ])
    expect(disguised).toBe("Many of the houses lacked even basic ~s (= baths, showers, hot water, etc.).")
  })

  it("handles 'She kept cutting in on our conversation'", () => {
    const disguised = vm.concealWords("She kept cutting in on our conversation", [ "cut", "in", "on", "sb", "sth", "butt" ])
    expect(disguised).toBe("She kept ~ing ~ ~ our conversation")
  })

  it("handles ''Forget it!' she cut in'", () => {
    const disguised = vm.concealWords("'Forget it!' she cut in", [ "cut", "in", "on", "sb", "sth", "butt" ])
    expect(disguised).toBe("'Forget it!' she ~ ~")
  })

  it("handles 'They had escaped to America shortly before war broke out in 1939'", () => {
    const disguised = vm.concealWords("They had escaped to America shortly before war broke out in 1939", [ "break", "out" ])
    expect(disguised).toBe("They had escaped to America shortly before war ~ ~ in 1939")
  })

  it("handles 'Fighting had broken out between rival groups of fans'", () => {
    const disguised = vm.concealWords("Fighting had broken out between rival groups of fans", [ "break", "out" ])
    expect(disguised).toBe("Fighting had ~ ~ between rival groups of fans")
  })

  it("handles 'Fire broke out during the night'", () => {
    const disguised = vm.concealWords("Fire broke out during the night", [ "break", "out" ])
    expect(disguised).toBe("Fire ~ ~ during the night")
  })

  it("handles 'My mother underwent major surgery last year.'", () => {
    const disguised = vm.concealWords("My mother underwent major surgery last year.", [ "undergo", "underwent" ])
    expect(disguised).toBe("My mother ~ major surgery last year.")
  })

  it("handles 'buildings in need of renovation'", () => {
    const disguised = vm.concealWords("buildings in need of renovation", [ "renovate" ])
    expect(disguised).toBe("buildings in need of ~")
  })

  it("handles 'The car is beautifully engineered and a pleasure to drive.'", () => {
    const disguised = vm.concealWords("The car is beautifully engineered and a pleasure to drive.", [ "engineer" ])
    expect(disguised).toBe("The car is beautifully ~ed and a pleasure to drive.")
  })

  it("handles 'The students demonstrated a good knowledge of fundamental engineering principles. They constructed a working model of the bridge, which occupied an entire car park.'", () => {
    const disguised = vm.concealWords("The students demonstrated a good knowledge of fundamental engineering principles. They constructed a working model of the bridge, which occupied an entire car park.", [ "engineer" ])
    expect(disguised).toBe("The students demonstrated a good knowledge of fundamental ~ing principles. They constructed a working model of the bridge, which occupied an entire car park.")
  })

  it("handles 'Primeval forests'", () => {
    const disguised = vm.concealWords("Primeval forests", [ "primeval", "primaeval" ])
    expect(disguised).toBe("~ forests")
  })

  it("handles 'Primeval soup (= the mixture of gases and substances that is thought to have existed when the earth was formed and from which life started)'", () => {
    const disguised = vm.concealWords("Primeval soup (= the mixture of gases and substances that is thought to have existed when the earth was formed and from which life started)", [ "primeval", "primaeval" ])
    expect(disguised).toBe("~ soup (= the mixture of gases and substances that is thought to have existed when the earth was formed and from which life started)")
  })

  it("handles 'She defied her parents and got married'", () => {
    const disguised = vm.concealWords("She defied her parents and got married", [ "defy" ])
    expect(disguised).toBe("She ~ed her parents and got married")
  })

  it("handles 'The gladiator who defied an emperor'", () => {
    const disguised = vm.concealWords("The gladiator who defied an emperor", [ "defy" ])
    expect(disguised).toBe("The gladiator who ~ed an emperor")
  })

  it("handles 'She kept cutting in on our conversation'", () => {
    const disguised = vm.concealWords("She kept cutting in on our conversation", [ "cut", "in", "on", "sth", "butt" ])
    expect(disguised).toBe("She kept ~ing ~ ~ our conversation")
  })

  it("handles ''Forget it!' she cut in'", () => {
    const disguised = vm.concealWords("'Forget it!' she cut in", [ "cut", "in", "on", "sth", "butt" ])
    expect(disguised).toBe("'Forget it!' she ~ ~")
  })

  it("handles 'Schools will bear the brunt of cuts in government spending'", () => {
    const disguised = vm.concealWords("Schools will bear the brunt of cuts in government spending", [ "bear", "take", "withstand", "the", "brunt", "of", "sth" ])
    expect(disguised).toBe("Schools will ~ ~ ~ ~ cuts in government spending")
  })

  it("handles 'The chamber must withstand the full brunt of deep-see pressure'", () => {
    const disguised = vm.concealWords("The chamber must withstand the full brunt of deep-see pressure", [ "bear", "take", "withstand", "the", "brunt", "of", "sth" ])
    expect(disguised).toBe("~ chamber must ~ ~ full ~ ~ deep-see pressure")
  })

  it("handles 'Lisa had ants in her pants thaday before her interview.'", () => {
    const disguised = vm.concealWords("Lisa had ants in her pants thaday before her interview.", [ "ants", "in", "one's", "pants" ])
    expect(disguised).toBe("Lisa had ~ ~ ~ ~ thaday before ~ interview.")
  })

  it("handles 'I learned about the birds and the bees when my baby brother was born.'", () => {
    const disguised = vm.concealWords("I learned about the birds and the bees when my baby brother was born.", [ "bird", "and", "the", "bees" ])
    expect(disguised).toBe("I learned about ~ ~s ~ ~ ~ when my baby brother was born.")
  })

  it("handles 'I ma going to have a cat nap while you're cooking dinner.'", () => {
    const disguised = vm.concealWords("I ma going to have a cat nap while you're cooking dinner.", [ "cat", "nap" ])
    expect(disguised).toBe("I ma going to have a ~ ~ while you're cooking dinner.")
  })

  it("handles 'I was going to take a ride on Geoff's motorcycle, but I chickened out when he gave me a helmet to wear.'", () => {
    const disguised = vm.concealWords("I was going to take a ride on Geoff's motorcycle, but I chickened out when he gave me a helmet to wear.", [ "chicken", "out" ])
    expect(disguised).toBe("I was going to take a ride on Geoff's motorcycle, but I ~ed ~ when he gave me a helmet to wear.")
  })

  it("handles 'Atrhur clammed up when I asked him about his family.'", () => {
    const disguised = vm.concealWords("Atrhur clammed up when I asked him about his family.", [ "clam", "up" ])
    expect(disguised).toBe("Atrhur ~ed ~ when I asked him about his family.")
  })

  it("handles 'I sleep in the basement during the dog days of August.'", () => {
    const disguised = vm.concealWords("I sleep in the basement during the dog days of August.", [ "dog", "days" ])
    expect(disguised).toBe("I sleep in the basement during the ~ ~ of August.")
  })

  it("handles 'My roses are dropping like flies in this early frost.'", () => {
    const disguised = vm.concealWords("My roses are dropping like flies in this early frost.", [ "dropping", "like", "flies" ])
    expect(disguised).toBe("My roses are ~ ~ ~ in this early frost.")
  })

  it("handles 'My teacher had a cow when she realized nobody had done the homework.'", () => {
    const disguised = vm.concealWords("My teacher had a cow when she realized nobody had done the homework.", [ "have", "a", "cow" ])
    expect(disguised).toBe("My teacher had ~ ~ when she realized nobody had done the homework.")
  })

  it("handles 'Hold your horses! I'll we done in the washroom in a minute.'", () => {
    const disguised = vm.concealWords("Hold your horses! I'll we done in the washroom in a minute.", [ "hold", "your", "horses" ])
    expect(disguised).toBe("~ ~ ~! I'll we done in the washroom in a minute.")
  })

  it("handles 'Holy cow! I can't believe you ate everything on your plate.'", () => {
    const disguised = vm.concealWords("Holy cow! I can't believe you ate everything on your plate.", [ "Holy", "cow!" ])
    expect(disguised).toBe("~ ~ I can't believe you ate everything on your plate.")
  })

  it("handles 'Who left the cat out of the bag about the surprise party?'", () => {
    const disguised = vm.concealWords("Who left the cat out of the bag about the surprise party?", [ "let", "the", "cat", "out", "of", "bag" ])
    expect(disguised).toBe("Who left ~ ~ ~ ~ ~ ~ about ~ surprise party?")
  })

  it("handles 'A little bird told me that you are thinking of quiting your job.'", () => {
    const disguised = vm.concealWords("A little bird told me that you are thinking of quiting your job.", [ "little", "bird", "told", "me" ])
    expect(disguised).toBe("A ~ ~ ~ ~ that you are thinking of quiting your job.")
  })

  it("handles 'Our one-year-old is saying bad words now. I told my husband, monkey see, monkey do'", () => {
    const disguised = vm.concealWords("Our one-year-old is saying bad words now. I told my husband, monkey see, monkey do", [ "monkey", "see,", "do" ])
    expect(disguised).toBe("Our one-year-old is saying bad words now. I told my husband, ~ ~ ~ ~")
  })

  it("handles 'We have a nest egg that we might have to use if Jim goes on sick leave'", () => {
    const disguised = vm.concealWords("We have a nest egg that we might have to use if Jim goes on sick leave", [ "nest", "egg" ])
    expect(disguised).toBe("We have a ~ ~ that we might have to use if Jim goes on sick leave")
  })

  it("handles 'I pigged out on pancakes so I don't have room for lunch'", () => {
    const disguised = vm.concealWords("I pigged out on pancakes so I don't have room for lunch", [ "pig", "out" ])
    expect(disguised).toBe("I ~ed ~ on pancakes so I don't have room for lunch")
  })

  it("handles 'I forgott my umbrella, and it was raining cats and dogs.'", () => {
    const disguised = vm.concealWords("I forgott my umbrella, and it was raining cats and dogs.", [ "raing", "cats", "and", "dogs" ])
    expect(disguised).toBe("I forgott my umbrella, ~ it was raining ~ ~ ~.")
  })

  it("handles 'I am ready to leave this rat race and retire in Mexico'", () => {
    const disguised = vm.concealWords("I am ready to leave this rat race and retire in Mexico", [ "rat", "race" ])
    expect(disguised).toBe("I am ready to leave this ~ ~ and retire in Mexico")
  })

  it("handles 'I asked my brothers not to tell my parents thet I went out, but I could smell a rat as soon I opened the door.'", () => {
    const disguised = vm.concealWords("I asked my brothers not to tell my parents thet I went out, but I could smell a rat as soon I opened the door.", [ "smell", "a", "rat" ])
    expect(disguised).toBe("I asked my brothers not to tell my parents thet I went out, but I could ~ ~ ~ ~s soon I opened the door.")
  })

  it("handles 'If you really think you deserve a promotion, you'll have to take the bull by the horns.'", () => {
    const disguised = vm.concealWords("If you really think you deserve a promotion, you'll have to take the bull by the horns.", [ "take", "the", "bull", "by", "horns" ])
    expect(disguised).toBe("If you really think you deserve a promotion, you'll have to ~ ~ ~ ~ ~ ~.")
  })

  it("handles 'I could eat pizza and ice-cream until the cows come home.'", () => {
    const disguised = vm.concealWords("I could eat pizza and ice-cream until the cows come home.", [ "until", "the", "cows", "come", "home" ])
    expect(disguised).toBe("I could eat pizza and ice-cream ~ ~ ~ ~ ~.")
  })

  it("handles 'You can talk till the cows come home—you'll never make me change my mind.'", () => {
    const disguised = vm.concealWords("You can talk till the cows come home—you'll never make me change my mind.", [ "until", "the", "cows", "come", "home" ])
    expect(disguised).toBe("You can talk till ~ ~ ~ ~—you'll never make me change my mind.")
  })

  it("handles 'I'm afraid in this line of work it's a case of dog eat dog.'", () => {
    const disguised = vm.concealWords("I'm afraid in this line of work it's a case of dog eat dog.", [ "dog", "eat" ])
    expect(disguised).toBe("I'm afraid in this line of work it's a case of ~ ~ ~.")
  })

  it("handles 'We're operating in a dog-eat-dog world.'", () => {
    const disguised = vm.concealWords("We're operating in a dog-eat-dog world.", [ "dog", "eat" ])
    expect(disguised).toBe("We're operating in a ~-~-~ world.")
  })

  it("handles 'This firm's gone to the dogs since the new management took over.'", () => {
    const disguised = vm.concealWords("This firm's gone to the dogs since the new management took over.", [ "go", "to", "the", "dogs" ])
    expect(disguised).toBe("This firm's ~ ~ ~ ~ since ~ new management took over.")
  })

  it("handles 'If you criticize him, it's like a red rag to a bull—he gets absolutely furious.'", () => {
    const disguised = vm.concealWords("If you criticize him, it's like a red rag to a bull—he gets absolutely furious.", [ "like", "a", "red", "rag", "to", "bull" ])
    expect(disguised).toBe("If you criticize him, it's ~ ~ ~ ~ ~ ~ ~—he gets absolutely furious.")
  })

  it("handles 'Then she told them she was dropping out of college. That really set the cat among the pigeons.'", () => {
    const disguised = vm.concealWords("Then she told them she was dropping out of college. That really set the cat among the pigeons.", [ "put", "the", "cat", "among", "pigeons" ])
    expect(disguised).toBe("Then she told them she was dropping out of college. That really set ~ ~ ~ ~ ~.")
  })

  it("handles '‘With a bit of luck, we'll be finished by the end of the year.’ ‘Yes, and pigs might fly!’'", () => {
    const disguised = vm.concealWords("‘With a bit of luck, we'll be finished by the end of the year.’ ‘Yes, and pigs might fly!’", [ "pigs", "might", "fly" ])
    expect(disguised).toBe("‘With a bit of luck, we'll be finished by the end of the year.’ ‘Yes, and ~ ~ ~!’")
  })

  it("handles 'Shards of glass'", () => {
    const disguised = vm.concealWords("Shards of glass", [ "shard", "sherd" ])
    expect(disguised).toBe("~s of glass")
  })

  it("handles 'Yes, Kelly is in a little bit of trouble, but I'm not going to lose any sleep over her'", () => {
    const disguised = vm.concealWords("Yes, Kelly is in a little bit of trouble, but I'm not going to lose any sleep over her", [ "lose", "sleep", "over", "about", "sb", "sth" ])
    expect(disguised).toBe("Yes, Kelly is in a little bit of trouble, but I'm not going to ~ any ~ ~ her")
  })

  it("handles 'Don't lose any sleep over the matter'", () => {
    const disguised = vm.concealWords("Don't lose any sleep over the matter", [ "lose", "sleep", "over", "about", "sb", "sth" ])
    expect(disguised).toBe("Don't ~ any ~ ~ the matter")
  })

  it("handles 'He was mentioned in dispatches'", () => {
    const disguised = vm.concealWords("He was mentioned in dispatches", [ "dispatch" ])
    expect(disguised).toBe("He was mentioned in ~s")
  })

  it("handles 'Eager minds that want to hear the latest dispatches from the particle trenches'", () => {
    const disguised = vm.concealWords("Eager minds that want to hear the latest dispatches from the particle trenches", [ "dispatch" ])
    expect(disguised).toBe("Eager minds that want to hear the latest ~s from the particle trenches")
  })

  it("handles 'Howard and Mick were drinking buddies.'", () => {
    const disguised = vm.concealWords("Howard and Mick were drinking buddies.", [ "buddy" ])
    expect(disguised).toBe("Howard and Mick were drinking ~s.")
  })

  it("handles 'It's a nice place. We've stayed there ourselves, as a matter of fact.'", () => {
    const disguised = vm.concealWords("It's a nice place. We've stayed there ourselves, as a matter of fact.", [ "as", "a", "matter", "of", "fact" ])
    expect(disguised).toBe("It's ~ nice place. We've stayed there ourselves, ~ ~ ~ ~ ~.")
  })

  it("handles 'He just rehashes songs from the 60s'", () => {
    const disguised = vm.concealWords("He just rehashes songs from the 60s", [ "rehash" ])
    expect(disguised).toBe("He just ~s songs from the 60s")
  })

  it("handles 'She is a designer of extraordinary versatility'", () => {
    const disguised = vm.concealWords("She is a designer of extraordinary versatility", [ "versatile", "versatility" ])
    expect(disguised).toBe("She is a designer of extraordinary ~")
  })

  it("handles 'We have been negotiating for more pay.'", () => {
    const disguised = vm.concealWords("We have been negotiating for more pay.", [ "negotiate" ])
    expect(disguised).toBe("We have been ~ing for more pay.")
  })

  it("handles 'They embraced and promised to keep in touch.'", () => {
    const disguised = vm.concealWords("They embraced and promised to keep in touch.", [ "embrace" ])
    expect(disguised).toBe("They ~ed and promised to keep in touch.")
  })

  it("handles 'I wish my mother would stop interfering and let me make my own decisions.'", () => {
    const disguised = vm.concealWords("I wish my mother would stop interfering and let me make my own decisions.", [ "interfere" ])
    expect(disguised).toBe("I wish my mother would stop ~ing and let me make my own decisions.")
  })

  it("handles 'he had strung the shells on a silver chain.'", () => {
    const disguised = vm.concealWords("he had strung the shells on a silver chain.", [ "string", "something", "together" ])
    expect(disguised).toBe("he had ~ the shells on a silver chain.")
  })

  it("handles 'carbon atoms strung together to form giant molecules'", () => {
    const disguised = vm.concealWords("carbon atoms strung together to form giant molecules", [ "string", "something", "together" ])
    expect(disguised).toBe("carbon atoms ~ ~ to form giant molecules")
  })

  it("handles 'interface interaction international'", () => {
    const disguised = vm.concealWords("interface interaction international", [ "inter-" ])
    expect(disguised).toBe("~face ~action ~national")
  })

  it("handles 'Thread on you wire mix beads and interspace them with crystal beads. Use crimp to leave some space on threads.'", () => {
    const disguised = vm.concealWords("Thread on you wire mix beads and interspace them with crystal beads. Use crimp to leave some space on threads.", [ "inter-" ])
    expect(disguised).toBe("Thread on you wire mix beads and ~space them with crystal beads. Use crimp to leave some space on threads.")
  })

  it("handles 'Don't hang up on me—we must talk!'", () => {
    const disguised = vm.concealWords("Don't hang up on me—we must talk!", [ "hang", "up" ])
    expect(disguised).toBe("Don't ~ ~ on me—we must talk!")
  })

  it("handles 'He goes jogging every morning, rain or shine.'", () => {
    const disguised = vm.concealWords("He goes jogging every morning, rain or shine.", [ "rain", "or", "shine" ])
    expect(disguised).toBe("He goes jogging every morning, ~ ~ ~.")
  })

  it("handles 'come rain, come shine'", () => {
    const disguised = vm.concealWords("come rain, come shine", [ "rain", "or", "shine" ])
    expect(disguised).toBe("come ~, come ~")
  })

  it("handles 'I'm not boring you, am I?'", () => {
    const disguised = vm.concealWords("I'm not boring you, am I?", [ "bore" ])
    expect(disguised).toBe("I'm not ~ing you, am I?")
  })

  it("handles 'Has he been boring you with his stories about his trip?'", () => {
    const disguised = vm.concealWords("Has he been boring you with his stories about his trip?", [ "bore" ])
    expect(disguised).toBe("Has he been ~ing you with his stories about his trip?")
  })

  it("handles 'Your duties will include setting up a new computer system.'", () => {
    const disguised = vm.concealWords("Your duties will include setting up a new computer system.", [ "set", "up", "set-up" ])
    expect(disguised).toBe("Your duties will include ~ing ~ a new computer system.")
  })

  it("handles 'I've set up a meeting for Friday.'", () => {
    const disguised = vm.concealWords("I've set up a meeting for Friday.", [ "set", "up", "set-up" ])
    expect(disguised).toBe("I've ~ ~ a meeting for Friday.")
  })

  it("handles 'to set up a business'", () => {
    const disguised = vm.concealWords("to set up a business", [ "set", "up", "set-up" ])
    expect(disguised).toBe("to ~ ~ a business")
  })

  it("handles 'The project implies an enormous investment in training.'", () => {
    const disguised = vm.concealWords("The project implies an enormous investment in training.", [ "imply" ])
    expect(disguised).toBe("The project ~s an enormous investment in training.")
  })

  it("handles 'Are you gonna go pick up yer date, Billy-Bob? Darn tootin! hyuk'", () => {
    const disguised = vm.concealWords("Are you gonna go pick up yer date, Billy-Bob? Darn tootin! hyuk", [ "darn", "tootin'" ])
    expect(disguised).toBe("Are you gonna go pick up yer date, Billy-Bob? ~ tootin! hyuk")
  })

  it("handles 'Darn it! I've lost my keys!'", () => {
    const disguised = vm.concealWords("Darn it! I've lost my keys!", [ "darn", "it" ])
    expect(disguised).toBe("~ ~! I've lost my keys!")
  })

  it("handles 'He deliberately threw a red herring into the conversation'", () => {
    const disguised = vm.concealWords("He deliberately threw a red herring into the conversation", [ "red", "herring" ])
    expect(disguised).toBe("He deliberately threw a ~ ~ into the conversation")
  })

  it("handles 'From the custom of using the smell of a smoked, dried herring (which was red) to train dogs to hunt'", () => {
    const disguised = vm.concealWords("From the custom of using the smell of a smoked, dried herring (which was red) to train dogs to hunt", [ "red", "herring" ])
    expect(disguised).toBe("From the custom of using the smell of a smoked, dried ~ (which was ~) to train dogs to hunt")
  })

  it("handles 'Could you sort out the toys that can be thrown away?'", () => {
    const disguised = vm.concealWords("Could you sort out the toys that can be thrown away?", [ "sort", "out", "sort-out" ])
    expect(disguised).toBe("Could you ~ ~ the toys that can be thrown away?")
  })

  it("handles 'to organize something successfully/ If you're going to the bus station, can you sort out the tickets for tomorrow?'", () => {
    const disguised = vm.concealWords("to organize something successfully/ If you're going to the bus station, can you sort out the tickets for tomorrow?", [ "sort", "out", "sort-out" ])
    expect(disguised).toBe("to organize something successfully/ If you're going to the bus station, can you ~ ~ the tickets for tomorrow?")
  })

  it("handles 'to free somebody from a duty, responsibility, contract, etc / The club is releasing some of its older players.'", () => {
    const disguised = vm.concealWords("to free somebody from a duty, responsibility, contract, etc / The club is releasing some of its older players.", [ "release", "let", "go,", "loose" ])
    expect(disguised).toBe("to free somebody from a duty, responsibility, contract, etc / The club is ~ing some of its older players.")
  })

  it("handles 'Though seriously ill, he still clings tenaciously to life'", () => {
    const disguised = vm.concealWords("Though seriously ill, he still clings tenaciously to life", [ "tenacious", "tenaciously", "tenacity" ])
    expect(disguised).toBe("Though seriously ill, he still clings ~ to life")
  })

  it("handles 'They competed with skill and tenacity'", () => {
    const disguised = vm.concealWords("They competed with skill and tenacity", [ "tenacious", "tenaciously", "tenacity" ])
    expect(disguised).toBe("They competed with skill and ~")
  })

  it("handles 'Sheets of frosted glass with varying degrees of opacity'", () => {
    const disguised = vm.concealWords("Sheets of frosted glass with varying degrees of opacity", [ "opaque", "opacity" ])
    expect(disguised).toBe("Sheets of frosted glass with varying degrees of ~")
  })

  it("handles 'Not being one to take these editorial liberties lying down, I replied'", () => {
    const disguised = vm.concealWords("Not being one to take these editorial liberties lying down, I replied", [ "take", "sth", "lying", "down" ])
    expect(disguised).toBe("Not being one to ~ these editorial liberties ~ ~, I replied")
  })

  it("handles 'ferries sailing back and forth between the islands'", () => {
    const disguised = vm.concealWords("ferries sailing back and forth between the islands", [ "back", "and", "forth" ])
    expect(disguised).toBe("ferries sailing ~ ~ ~ between the islands")
  })

  it("handles 'Someone grabbed me from behind'", () => {
    const disguised = vm.concealWords("Someone grabbed me from behind", [ "grab", "how", "does…grab", "you?" ])
    expect(disguised).toBe("Someone ~ed me from behind")
  })

  it("handles 'She grabbed the child's hand and ran.'", () => {
    const disguised = vm.concealWords("She grabbed the child's hand and ran.", [ "grab", "how", "does…grab", "you?" ])
    expect(disguised).toBe("She ~ed the child's hand and ran.")
  })

  it("handles 'He grabbed her around the throat and squeezed.'", () => {
    const disguised = vm.concealWords("He grabbed her around the throat and squeezed.", [ "grab", "how", "does…grab", "you?" ])
    expect(disguised).toBe("He ~ed her around the throat and squeezed.")
  })

  it("handles 'to take advantage of an opportunity to do or have something/ This was my big chance and I grabbed it with both hands.'", () => {
    const disguised = vm.concealWords("to take advantage of an opportunity to do or have something/ This was my big chance and I grabbed it with both hands.", [ "grab", "how", "does…grab", "you?" ])
    expect(disguised).toBe("to take advantage of an opportunity to do or have something/ This was my big chance and I ~ed it with both hands.")
  })

  it("handles 'a path, road, etc. that leads to a place/ All the approaches to the palace were guarded by troops.'", () => {
    const disguised = vm.concealWords("a path, road, etc. that leads to a place/ All the approaches to the palace were guarded by troops.", [ "approach", "approachable" ])
    expect(disguised).toBe("a path, road, etc. that leads to a place/ All the ~s to the palace were guarded by troops.")
  })

  it("handles 'They dug deeper and deeper but still found nothing.'", () => {
    const disguised = vm.concealWords("They dug deeper and deeper but still found nothing.", [ "dig", "dug" ])
    expect(disguised).toBe("They ~ deeper and deeper but still found nothing.")
  })

  it("handles 'She really overdid the sympathy (= and so did not seem sincere).'", () => {
    const disguised = vm.concealWords("She really overdid the sympathy (= and so did not seem sincere).", [ "overdo", "overdid" ])
    expect(disguised).toBe("She really ~ the sympathy (= and so did not seem sincere).")
  })

  it("handles 'I overdid it in the gym and hurt my back.'", () => {
    const disguised = vm.concealWords("I overdid it in the gym and hurt my back.", [ "overdo", "overdid" ])
    expect(disguised).toBe("I ~ it in the gym and hurt my back.")
  })

  it("handles 'bend downwards/A cigarette hung from her lips.'", () => {
    const disguised = vm.concealWords("bend downwards/A cigarette hung from her lips.", [ "hang", "hung" ])
    expect(disguised).toBe("bend downwards/A cigarette ~ from her lips.")
  })

  it("handles 'to be moved by the wind, somebody's breath, etc; to move something in this way/ My hat blew off.'", () => {
    const disguised = vm.concealWords("to be moved by the wind, somebody's breath, etc; to move something in this way/ My hat blew off.", [ "blow", "blew,", "blown" ])
    expect(disguised).toBe("to be moved by the wind, somebody's breath, etc; to move something in this way/ My hat ~ off.")
  })

  it("handles 'to waste an opportunity/ She blew her chances by arriving late for the interview.'", () => {
    const disguised = vm.concealWords("to waste an opportunity/ She blew her chances by arriving late for the interview.", [ "blow", "blew,", "blown" ])
    expect(disguised).toBe("to waste an opportunity/ She ~ her chances by arriving late for the interview.")
  })

  it("handles 'He seemed genuinely remorseful for what he had done'", () => {
    const disguised = vm.concealWords("He seemed genuinely remorseful for what he had done", [ "remorse", "remorseful", "remorsefully" ])
    expect(disguised).toBe("He seemed genuinely ~ for what he had done")
  })

  it("handles 'She's too vain to wear glasses'", () => {
    const disguised = vm.concealWords("She's too vain to wear glasses", [ "vanity", "próżność", "vain" ])
    expect(disguised).toBe("She's too ~ to wear glasses")
  })

  it("handles 'The job involves gathering and analysing data.'", () => {
    const disguised = vm.concealWords("The job involves gathering and analysing data.", [ "analyse", "review", "study", "discuss", "analysis", "plural", "analyses", "analitycal", "analytically" ])
    expect(disguised).toBe("The job involves gathering and ~ing data.")
  })

  it("handles 'idiom/ in the final/last analysis (used to say what is most important after everything has been discussed, or considered) fe: In the final analysis, it's a matter of personal choice.'", () => {
    const disguised = vm.concealWords("idiom/ in the final/last analysis (used to say what is most important after everything has been discussed, or considered) fe: In the final analysis, it's a matter of personal choice.", [ "analyse", "review", "study", "discuss", "analysis", "plural", "analyses", "analitycal", "analytically" ])
    expect(disguised).toBe("idiom/ in the final/last ~ (used to say what is most important after everything has been ~ed, or considered) fe: In the final ~, it's a matter of personal choice.")
  })

  it("handles 'He was busy tapping away at his computer.'", () => {
    const disguised = vm.concealWords("He was busy tapping away at his computer.", [ "tap" ])
    expect(disguised).toBe("He was busy ~ing away at his computer.")
  })

  it("handles 'Ralph tapped me on the shoulder.'", () => {
    const disguised = vm.concealWords("Ralph tapped me on the shoulder.", [ "tap" ])
    expect(disguised).toBe("Ralph ~ed me on the shoulder.")
  })

  it("handles 'to increase or make something increase very much in number or amount/ Cigarette smoking multiplies the risk of cancer.'", () => {
    const disguised = vm.concealWords("to increase or make something increase very much in number or amount/ Cigarette smoking multiplies the risk of cancer.", [ "multiply", "multiple" ])
    expect(disguised).toBe("to increase or make something increase very much in number or amount/ Cigarette smoking ~s the risk of cancer.")
  })

  it("handles 'The bodies were identified as those of two suspected drug dealers.'", () => {
    const disguised = vm.concealWords("The bodies were identified as those of two suspected drug dealers.", [ "identify" ])
    expect(disguised).toBe("The bodies were ~ed as those of two suspected drug dealers.")
  })

  it("handles 'Scientists have identified a link between diet and cancer. (to find or discover somebody/something)'", () => {
    const disguised = vm.concealWords("Scientists have identified a link between diet and cancer. (to find or discover somebody/something)", [ "identify" ])
    expect(disguised).toBe("Scientists have ~ed a link between diet and cancer. (to find or discover somebody/something)")
  })

  it("handles 'Attitudes learned at home carry over into the playground.'", () => {
    const disguised = vm.concealWords("Attitudes learned at home carry over into the playground.", [ "carry", "out", "conduct", "perform" ])
    expect(disguised).toBe("Attitudes learned at home ~ over into the playground.")
  })

  it("handles 'carry out an experiment/a test/ observations'", () => {
    const disguised = vm.concealWords("carry out an experiment/a test/ observations", [ "carry", "out", "conduct", "perform" ])
    expect(disguised).toBe("~ ~ an experiment/a test/ observations")
  })

  it("handles 'to breathe in smoke or air/ He drew thoughtfully on his pipe.'", () => {
    const disguised = vm.concealWords("to breathe in smoke or air/ He drew thoughtfully on his pipe.", [ "draw", "drew", "drawn" ])
    expect(disguised).toBe("to breathe in smoke or air/ He ~ thoughtfully on his pipe.")
  })

  it("handles 'He skimmed through the article trying to find his name.'", () => {
    const disguised = vm.concealWords("He skimmed through the article trying to find his name.", [ "skim", "to", "read", "for" ])
    expect(disguised).toBe("He ~ed through the article trying ~ find his name.")
  })

  it("handles 'Small boys were skimming stones across the water.'", () => {
    const disguised = vm.concealWords("Small boys were skimming stones across the water.", [ "skim", "to", "read", "for" ])
    expect(disguised).toBe("Small boys were ~ing stones across the water.")
  })

  it("handles 'Come on, don't you think you're evading the issue?'", () => {
    const disguised = vm.concealWords("Come on, don't you think you're evading the issue?", [ "evade" ])
    expect(disguised).toBe("Come on, don't you think you're ~ing the issue?")
  })

  it("handles 'My sweater shrank in the wash.'", () => {
    const disguised = vm.concealWords("My sweater shrank in the wash.", [ "shrink", "shrunk", "grow" ])
    expect(disguised).toBe("My sweater ~ in the wash.")
  })

  it("handles 'Her early work is exemplified in her book, ‘A Study of Children's Minds’.'", () => {
    const disguised = vm.concealWords("Her early work is exemplified in her book, ‘A Study of Children's Minds’.", [ "exemplify", "illustrate", "examplification" ])
    expect(disguised).toBe("Her early work is ~ed in her book, ‘A Study of Children's Minds’.")
  })

  it("handles 'His food exemplifies Italian cooking at its best.'", () => {
    const disguised = vm.concealWords("His food exemplifies Italian cooking at its best.", [ "exemplify", "illustrate", "examplification" ])
    expect(disguised).toBe("His food ~s Italian cooking at its best.")
  })

  it("handles 'Somewhere along the line a large amount of money went missing.'", () => {
    const disguised = vm.concealWords("Somewhere along the line a large amount of money went missing.", [ "along", "the", "line" ])
    expect(disguised).toBe("Somewhere ~ ~ ~ a large amount of money went missing.")
  })

  it("handles 'We'll make a decision on that further down the line.'", () => {
    const disguised = vm.concealWords("We'll make a decision on that further down the line.", [ "along", "the", "line" ])
    expect(disguised).toBe("We'll make a decision on that further down ~ ~.")
  })

  it("handles 'hen night'", () => {
    const disguised = vm.concealWords("hen night", [ "hen", "party", "stag", "night" ])
    expect(disguised).toBe("~ ~")
  })

  it("handles 'Fish coated with breadcrumbs'", () => {
    const disguised = vm.concealWords("Fish coated with breadcrumbs", [ "crumb", "breadcrumbs" ])
    expect(disguised).toBe("Fish coated with ~")
  })

  it("handles 'To express yourself coherently'", () => {
    const disguised = vm.concealWords("To express yourself coherently", [ "coherent", "incoherent", "coherently" ])
    expect(disguised).toBe("To express yourself ~ly")
  })

  it("handles 'Standards of morality seem to be dropping.'", () => {
    const disguised = vm.concealWords("Standards of morality seem to be dropping.", [ "drop" ])
    expect(disguised).toBe("Standards of morality seem to be ~ing.")
  })

  it("handles 'The climber slipped and dropped to his death.'", () => {
    const disguised = vm.concealWords("The climber slipped and dropped to his death.", [ "drop" ])
    expect(disguised).toBe("The climber slipped and ~ed to his death.")
  })

  it("handles 'He dropped his trousers (= undid them and let them fall).'", () => {
    const disguised = vm.concealWords("He dropped his trousers (= undid them and let them fall).", [ "drop" ])
    expect(disguised).toBe("He ~ed his trousers (= undid them and let them fall).")
  })

  it("handles 'become less/ The temperature has dropped considerably.'", () => {
    const disguised = vm.concealWords("become less/ The temperature has dropped considerably.", [ "drop" ])
    expect(disguised).toBe("become less/ The temperature has ~ed considerably.")
  })

  it("handles 'political rivalries/ national rivalries'", () => {
    const disguised = vm.concealWords("political rivalries/ national rivalries", [ "rivalry", "rival" ])
    expect(disguised).toBe("political ~s/ national ~s")
  })

  it("handles 'economic inequalities between different areas'", () => {
    const disguised = vm.concealWords("economic inequalities between different areas", [ "inequality", "equality" ])
    expect(disguised).toBe("economic ~s between different areas")
  })

  it("handles 'to be fully/poorly equipped'", () => {
    const disguised = vm.concealWords("to be fully/poorly equipped", [ "equip", "kit", "out" ])
    expect(disguised).toBe("to be fully/poorly ~ed")
  })

  it("handles 'The centre is well equipped for canoeing and mountaineering.'", () => {
    const disguised = vm.concealWords("The centre is well equipped for canoeing and mountaineering.", [ "equip", "kit", "out" ])
    expect(disguised).toBe("The centre is well ~ed for canoeing and mountaineering.")
  })

  it("handles 'People are basically the same the world over.'", () => {
    const disguised = vm.concealWords("People are basically the same the world over.", [ "the", "world", "over" ])
    expect(disguised).toBe("People are basically ~ same ~ ~ ~.")
  })

  it("handles 'IDIOM cry over spilt milk'", () => {
    const disguised = vm.concealWords("IDIOM cry over spilt milk", [ "spill", "cry", "over", "spilt", "milk" ])
    expect(disguised).toBe("IDIOM ~ ~ ~ ~")
  })

  it("handles 'patches of dense fog'", () => {
    const disguised = vm.concealWords("patches of dense fog", [ "patch" ])
    expect(disguised).toBe("~s of dense fog")
  })

  it("handles 'piece of material/ I sewed patches on the knees of my jeans.'", () => {
    const disguised = vm.concealWords("piece of material/ I sewed patches on the knees of my jeans.", [ "patch" ])
    expect(disguised).toBe("piece of material/ I sewed ~s on the knees of my jeans.")
  })

  it("handles 'To sleep in would be business suicide.'", () => {
    const disguised = vm.concealWords("To sleep in would be business suicide.", [ "sleep", "in" ])
    expect(disguised).toBe("To ~ ~ would be business suicide.")
  })

  it("handles 'The company takes account of environmental issues wherever possible.'", () => {
    const disguised = vm.concealWords("The company takes account of environmental issues wherever possible.", [ "take", "account", "of" ])
    expect(disguised).toBe("The company ~s ~ ~ environmental issues wherever possible.")
  })

  it("handles 'Coursework is taken into account as well as exam results.'", () => {
    const disguised = vm.concealWords("Coursework is taken into account as well as exam results.", [ "take", "account", "of" ])
    expect(disguised).toBe("Coursework is ~ into ~ as well as exam results.")
  })

  it("handles 'The defendant asked for a number of other offences to be taken into account.'", () => {
    const disguised = vm.concealWords("The defendant asked for a number of other offences to be taken into account.", [ "take", "account", "of" ])
    expect(disguised).toBe("The defendant asked for a number ~ other offences to be ~ into ~.")
  })

  it("handles '1. The closure of the factory will lead to a number of job losses.'", () => {
    const disguised = vm.concealWords("1. The closure of the factory will lead to a number of job losses.", [ "loss" ])
    expect(disguised).toBe("1. The closure of the factory will lead to a number of job ~s.")
  })

  it("handles 'The drug prevents the virus from replicating itself.'", () => {
    const disguised = vm.concealWords("The drug prevents the virus from replicating itself.", [ "replicate", "duplicate", "replication" ])
    expect(disguised).toBe("The drug prevents the virus from ~ing itself.")
  })

  it("handles 'She flogged her guitar to another student'", () => {
    const disguised = vm.concealWords("She flogged her guitar to another student", [ "flog" ])
    expect(disguised).toBe("She ~ed her guitar to another student")
  })

  it("handles 'Where can I go to hear Sean do things like relentlessly flogging his new book'", () => {
    const disguised = vm.concealWords("Where can I go to hear Sean do things like relentlessly flogging his new book", [ "flog" ])
    expect(disguised).toBe("Where can I go to hear Sean do things like relentlessly ~ing his new book")
  })

  it("handles 'The company managed to stave off bankruptcy for another few months'", () => {
    const disguised = vm.concealWords("The company managed to stave off bankruptcy for another few months", [ "stave", "sth", "off", "staved", "stove" ])
    expect(disguised).toBe("The company managed to ~ ~ bankruptcy for another few months")
  })

  it("handles 'To stave off hunger'", () => {
    const disguised = vm.concealWords("To stave off hunger", [ "stave", "sth", "off", "staved", "stove" ])
    expect(disguised).toBe("To ~ ~ hunger")
  })

  it("handles 'The narrow streets were clogged with traffic'", () => {
    const disguised = vm.concealWords("The narrow streets were clogged with traffic", [ "clog" ])
    expect(disguised).toBe("The narrow streets were ~ed with traffic")
  })

  it("handles 'Tears clogged her throat'", () => {
    const disguised = vm.concealWords("Tears clogged her throat", [ "clog" ])
    expect(disguised).toBe("Tears ~ed her throat")
  })

  it("handles 'Prices hit rock bottom'", () => {
    const disguised = vm.concealWords("Prices hit rock bottom", [ "rock", "bottom" ])
    expect(disguised).toBe("Prices hit ~ ~")
  })

  it("handles 'The marriage had reached rock bottom'", () => {
    const disguised = vm.concealWords("The marriage had reached rock bottom", [ "rock", "bottom" ])
    expect(disguised).toBe("The marriage had reached ~ ~")
  })

  it("handles 'rejection (noun): ... it is in some sense inherently ironic that a new fashion starts from rejection of the old and often an eager embracing of what was previously consider ugly.'", () => {
    const disguised = vm.concealWords("rejection (noun): ... it is in some sense inherently ironic that a new fashion starts from rejection of the old and often an eager embracing of what was previously consider ugly.", [ "reject", "rejection" ])
    expect(disguised).toBe("~ (noun): ... it is in some sense inherently ironic that a new fashion starts from ~ of the old and often an eager embracing of what was previously consider ugly.")
  })

  it("handles 'The birds are found in over 70 different localities.'", () => {
    const disguised = vm.concealWords("The birds are found in over 70 different localities.", [ "locality", "vicinity" ])
    expect(disguised).toBe("The birds are found in over 70 different ~s.")
  })

  it("handles 'While he may generally be a liberal parent, where drugs are concerned he believes in tough love'", () => {
    const disguised = vm.concealWords("While he may generally be a liberal parent, where drugs are concerned he believes in tough love", [ "tough", "love" ])
    expect(disguised).toBe("While he may generally be a liberal parent, where drugs are concerned he believes in ~ ~")
  })

  it("handles 'There are occasions when only tough-love solutions will work'", () => {
    const disguised = vm.concealWords("There are occasions when only tough-love solutions will work", [ "tough", "love" ])
    expect(disguised).toBe("There are occasions when only ~-~ solutions will work")
  })

  it("handles 'A bona fide reason'", () => {
    const disguised = vm.concealWords("A bona fide reason", [ "bona", "fide" ])
    expect(disguised).toBe("A ~ ~ reason")
  })

  it("handles 'Is it a bona fide, reputable organization?'", () => {
    const disguised = vm.concealWords("Is it a bona fide, reputable organization?", [ "bona", "fide" ])
    expect(disguised).toBe("Is it a ~ ~, reputable organization?")
  })

  it("handles 'You're a bona fide member of the team now'", () => {
    const disguised = vm.concealWords("You're a bona fide member of the team now", [ "bona", "fide" ])
    expect(disguised).toBe("You're a ~ ~ member of the team now")
  })

  it("handles 'Their members share dreams, bona fide game-changing visions without limits.'", () => {
    const disguised = vm.concealWords("Their members share dreams, bona fide game-changing visions without limits.", [ "bona", "fide" ])
    expect(disguised).toBe("Their members share dreams, ~ ~ game-changing visions without limits.")
  })

  it("handles 'Voters are being wooed with promises of lower taxes'", () => {
    const disguised = vm.concealWords("Voters are being wooed with promises of lower taxes", [ "woo" ])
    expect(disguised).toBe("Voters are being ~ed with promises of lower taxes")
  })

  it("handles 'Selected items are being sold at half price to woo customers into the store'", () => {
    const disguised = vm.concealWords("Selected items are being sold at half price to woo customers into the store", [ "woo" ])
    expect(disguised).toBe("Selected items are being sold at half price to ~ customers into the store")
  })

  it("handles 'Businesses can ~ and cater to new and repeat customers in ways that previously weren't possible'", () => {
    const disguised = vm.concealWords("Businesses can ~ and cater to new and repeat customers in ways that previously weren't possible", [ "flatter" ])
    expect(disguised).toBe("Businesses can ~ and cater to new and repeat customers in ways that previously weren't possible")
  })

  it("handles 'Growing regional disparities in economic prosperity'", () => {
    const disguised = vm.concealWords("Growing regional disparities in economic prosperity", [ "disparity" ])
    expect(disguised).toBe("Growing regional ~s in economic prosperity")
  })

  it("handles 'Global Imbalances - disparities in levels of capital and populations around the world are a cause for concern'", () => {
    const disguised = vm.concealWords("Global Imbalances - disparities in levels of capital and populations around the world are a cause for concern", [ "disparity" ])
    expect(disguised).toBe("Global Imbalances - ~s in levels of capital and populations around the world are a cause for concern")
  })

  it("handles 'She had never bought into the idea that to be attractive you have to be thin'", () => {
    const disguised = vm.concealWords("She had never bought into the idea that to be attractive you have to be thin", [ "buy", "into", "sth" ])
    expect(disguised).toBe("She had never ~ ~ the idea that to be attractive you have to be thin")
  })

  it("handles 'Perhaps the most powerful reason most people buy into apocalyptic notions of globalization has to do with our almost religious worship of technology'", () => {
    const disguised = vm.concealWords("Perhaps the most powerful reason most people buy into apocalyptic notions of globalization has to do with our almost religious worship of technology", [ "buy", "into", "sth" ])
    expect(disguised).toBe("Perhaps the most powerful reason most people ~ ~ apocalyptic notions of globalization has to do with our almost religious worship of technology")
  })

  it("handles 'He adroitly avoided answering my questions'", () => {
    const disguised = vm.concealWords("He adroitly avoided answering my questions", [ "adroit", "adroitly", "adroitness" ])
    expect(disguised).toBe("He ~ly avoided answering my questions")
  })

  it("handles 'Today, scientists contend that prehistoric cavemen adroitly worked together in teams to hunt prey they could not possibly kill alone'", () => {
    const disguised = vm.concealWords("Today, scientists contend that prehistoric cavemen adroitly worked together in teams to hunt prey they could not possibly kill alone", [ "adroit", "adroitly", "adroitness" ])
    expect(disguised).toBe("Today, scientists contend that prehistoric cavemen ~ly worked together in teams to hunt prey they could not possibly kill alone")
  })

  it("handles 'A dolphin leapt out of the water'", () => {
    const disguised = vm.concealWords("A dolphin leapt out of the water", [ "leap", "leapt", "leaped" ])
    expect(disguised).toBe("A dolphin ~ out of the water")
  })

  it("handles 'We leapt over the stream'", () => {
    const disguised = vm.concealWords("We leapt over the stream", [ "leap", "leapt", "leaped" ])
    expect(disguised).toBe("We ~ over the stream")
  })

  it("handles 'The horse leapt a five-foot wall'", () => {
    const disguised = vm.concealWords("The horse leapt a five-foot wall", [ "leap", "leapt", "leaped" ])
    expect(disguised).toBe("The horse ~ a five-foot wall")
  })

  it("handles 'She leapt out of bed'", () => {
    const disguised = vm.concealWords("She leapt out of bed", [ "leap", "leapt", "leaped" ])
    expect(disguised).toBe("She ~ out of bed")
  })

  it("handles 'He leapt across the room to answer the door'", () => {
    const disguised = vm.concealWords("He leapt across the room to answer the door", [ "leap", "leapt", "leaped" ])
    expect(disguised).toBe("He ~ across the room to answer the door")
  })

  it("handles 'I leapt to my feet (= stood up quickly)'", () => {
    const disguised = vm.concealWords("I leapt to my feet (= stood up quickly)", [ "leap", "leapt", "leaped" ])
    expect(disguised).toBe("I ~ to my feet (= stood up quickly)")
  })

  it("handles 'They leapt into action immediately'", () => {
    const disguised = vm.concealWords("They leapt into action immediately", [ "leap", "leapt", "leaped" ])
    expect(disguised).toBe("They ~ into action immediately")
  })

  it("handles 'His name leapt out at me (= I saw it immediately)'", () => {
    const disguised = vm.concealWords("His name leapt out at me (= I saw it immediately)", [ "leap", "leapt", "leaped" ])
    expect(disguised).toBe("His name ~ out at me (= I saw it immediately)")
  })

  it("handles 'I had to pay out £500 to get my car repaired.'", () => {
    const disguised = vm.concealWords("I had to pay out £500 to get my car repaired.", [ "pay", "out" ])
    expect(disguised).toBe("I had to ~ ~ £500 to get my car repaired.")
  })

  it("handles 'Make them pay out of their own pockets.'", () => {
    const disguised = vm.concealWords("Make them pay out of their own pockets.", [ "pay", "out" ])
    expect(disguised).toBe("Make them ~ ~ of their own pockets.")
  })

  it("handles 'Come off it! We don't have a chance.'", () => {
    const disguised = vm.concealWords("Come off it! We don't have a chance.", [ "come", "off", "it" ])
    expect(disguised).toBe("~ ~ ~! We don't have a chance.")
  })

  it("handles 'Oh, come off it, you are saying!'", () => {
    const disguised = vm.concealWords("Oh, come off it, you are saying!", [ "come", "off", "it" ])
    expect(disguised).toBe("Oh, ~ ~ ~, you are saying!")
  })

  it("handles 'Unmotivated employees resigned to their lot are a dime a dozen'", () => {
    const disguised = vm.concealWords("Unmotivated employees resigned to their lot are a dime a dozen", [ "a", "dime", "dozen", "two", "ten", "penny" ])
    expect(disguised).toBe("Unmotivated employees resigned to their lot are ~ ~ ~ ~")
  })

  it("handles 'I was conned into buying a useless car'", () => {
    const disguised = vm.concealWords("I was conned into buying a useless car", [ "con" ])
    expect(disguised).toBe("I was ~ed into buying a useless car")
  })

  it("handles 'They had been conned out of £100000'", () => {
    const disguised = vm.concealWords("They had been conned out of £100000", [ "con" ])
    expect(disguised).toBe("They had been ~ed out of £100000")
  })

  it("handles 'He conned his way into the job using false references'", () => {
    const disguised = vm.concealWords("He conned his way into the job using false references", [ "con" ])
    expect(disguised).toBe("He ~ed his way into the job using false references")
  })

  it("handles 'They might be able to slip a pet peeve of mine past an unsuspecting public'", () => {
    const disguised = vm.concealWords("They might be able to slip a pet peeve of mine past an unsuspecting public", [ "pet", "peeve", "hate" ])
    expect(disguised).toBe("They might be able to slip a ~ ~ of mine past an unsuspecting public")
  })

  it("handles 'It's time you told him a few home truths'", () => {
    const disguised = vm.concealWords("It's time you told him a few home truths", [ "home", "truth" ])
    expect(disguised).toBe("It's time you told him a few ~ ~s")
  })

  it("handles 'Her difficult childhood spurred her on to succeed'", () => {
    const disguised = vm.concealWords("Her difficult childhood spurred her on to succeed", [ "spur" ])
    expect(disguised).toBe("Her difficult childhood ~ed her on to succeed")
  })

  it("handles 'My trainer spurred me to keep up a pace of four miles an hour'", () => {
    const disguised = vm.concealWords("My trainer spurred me to keep up a pace of four miles an hour", [ "spur" ])
    expect(disguised).toBe("My trainer ~ed me to keep up a pace of four miles an hour")
  })

  it("handles 'I was spurred into action by the letter'", () => {
    const disguised = vm.concealWords("I was spurred into action by the letter", [ "spur" ])
    expect(disguised).toBe("I was ~ed into action by the letter")
  })

  it("handles 'The band has been spurred on by the success of their last single'", () => {
    const disguised = vm.concealWords("The band has been spurred on by the success of their last single", [ "spur" ])
    expect(disguised).toBe("The band has been ~ed on by the success of their last single")
  })

  it("handles 'This evidence meshes with earlier reports of an organized riot'", () => {
    const disguised = vm.concealWords("This evidence meshes with earlier reports of an organized riot", [ "mesh" ])
    expect(disguised).toBe("This evidence ~s with earlier reports of an organized riot")
  })

  it("handles 'Frame your presentation in a way that meshes with your natural style of personal interaction'", () => {
    const disguised = vm.concealWords("Frame your presentation in a way that meshes with your natural style of personal interaction", [ "mesh" ])
    expect(disguised).toBe("Frame your presentation in a way that ~s with your natural style of personal interaction")
  })

  it("handles 'Many of the thorniest issues we face in our lives are less about right versus wrong than about right versus right'", () => {
    const disguised = vm.concealWords("Many of the thorniest issues we face in our lives are less about right versus wrong than about right versus right", [ "thorny", "thorn", "knotty" ])
    expect(disguised).toBe("Many of the ~est issues we face in our lives are less about right versus wrong than about right versus right")
  })

  it("handles 'He bragged to his friends about the crime'", () => {
    const disguised = vm.concealWords("He bragged to his friends about the crime", [ "brag", "boast" ])
    expect(disguised).toBe("He ~ed to his friends about the crime")
  })

  it("handles 'I'm not bragging but I think I did very well in the interview'", () => {
    const disguised = vm.concealWords("I'm not bragging but I think I did very well in the interview", [ "brag", "boast" ])
    expect(disguised).toBe("I'm not ~ing but I think I did very well in the interview")
  })

  it("handles 'He didn't like the media probing into his past'", () => {
    const disguised = vm.concealWords("He didn't like the media probing into his past", [ "probe", "investigate" ])
    expect(disguised).toBe("He didn't like the media ~ing into his past")
  })

  it("handles 'Women have always been at the forefront of the Green movement.'", () => {
    const disguised = vm.concealWords("Women have always been at the forefront of the Green movement.", [ "at", "the", "forefront", "of" ])
    expect(disguised).toBe("Women have always been ~ ~ ~ ~ ~ Green movement.")
  })

  it("handles 'The court case was constantly in the forefront of my mind (= I thought about it all the time).'", () => {
    const disguised = vm.concealWords("The court case was constantly in the forefront of my mind (= I thought about it all the time).", [ "at", "the", "forefront", "of" ])
    expect(disguised).toBe("~ court case was constantly in ~ ~ ~ my mind (= I thought about it all ~ time).")
  })

  it("handles 'For decades Japanese electronics firm Nernit has managed to keep itself at the forefront of the ever-competitive and cut-throat wiecznie konkurencyjny i zaciekły) console market.'", () => {
    const disguised = vm.concealWords("For decades Japanese electronics firm Nernit has managed to keep itself at the forefront of the ever-competitive and cut-throat wiecznie konkurencyjny i zaciekły) console market.", [ "at", "the", "forefront", "of" ])
    expect(disguised).toBe("For decades Japanese electronics firm Nernit has managed to keep itself ~ ~ ~ ~ ~ ever-competitive and cut-throat wiecznie konkurencyjny i zaciekły) console market.")
  })

  it("handles 'We waited with bated breath for the winner to be announced.'", () => {
    const disguised = vm.concealWords("We waited with bated breath for the winner to be announced.", [ "with", "bated", "breath" ])
    expect(disguised).toBe("We waited ~ ~ ~ for the winner to be announced.")
  })

  it("handles 'The news made Polish headlines nationwide, and the country is still waiting with bated breath to see just what the fallout will be as the situation develops.'", () => {
    const disguised = vm.concealWords("The news made Polish headlines nationwide, and the country is still waiting with bated breath to see just what the fallout will be as the situation develops.", [ "with", "bated", "breath" ])
    expect(disguised).toBe("The news made Polish headlines nationwide, and the country is still waiting ~ ~ ~ to see just what the fallout will be as the situation develops.")
  })

  it("handles 'The countryside was dotted with small villages.'", () => {
    const disguised = vm.concealWords("The countryside was dotted with small villages.", [ "dot" ])
    expect(disguised).toBe("The countryside was ~ed with small villages.")
  })

  it("handles 'There are lots of Italian restaurants dotted around London.'", () => {
    const disguised = vm.concealWords("There are lots of Italian restaurants dotted around London.", [ "dot" ])
    expect(disguised).toBe("There are lots of Italian restaurants ~ed around London.")
  })

  it("handles 'Intertwining branches'", () => {
    const disguised = vm.concealWords("Intertwining branches", [ "intertwine" ])
    expect(disguised).toBe("~ing branches")
  })

  it("handles 'All candidates are carefully vetted for security reasons'", () => {
    const disguised = vm.concealWords("All candidates are carefully vetted for security reasons", [ "vet", "screen" ])
    expect(disguised).toBe("All candidates are carefully ~ed for security reasons")
  })

  it("handles 'All reports are vetted before publication'", () => {
    const disguised = vm.concealWords("All reports are vetted before publication", [ "vet", "screen" ])
    expect(disguised).toBe("All reports are ~ed before publication")
  })

  it("handles 'She insists on vetting questions prior to an interview'", () => {
    const disguised = vm.concealWords("She insists on vetting questions prior to an interview", [ "vet", "screen" ])
    expect(disguised).toBe("She insists on ~ing questions prior to an interview")
  })

  it("handles 'Other specialists vetted their work and deemed it accurate or mistaken'", () => {
    const disguised = vm.concealWords("Other specialists vetted their work and deemed it accurate or mistaken", [ "vet", "screen" ])
    expect(disguised).toBe("Other specialists ~ed their work and deemed it accurate or mistaken")
  })

  it("handles 'Her career was dogged by misfortune.'", () => {
    const disguised = vm.concealWords("Her career was dogged by misfortune.", [ "dog" ])
    expect(disguised).toBe("Her career was ~ed by misfortune.")
  })

  it("handles 'He had been dogged by bad health all his life.'", () => {
    const disguised = vm.concealWords("He had been dogged by bad health all his life.", [ "dog" ])
    expect(disguised).toBe("He had been ~ed by bad health all his life.")
  })

  it("handles 'The weeks went slowly by.'", () => {
    const disguised = vm.concealWords("The weeks went slowly by.", [ "go", "by" ])
    expect(disguised).toBe("The weeks ~ slowly ~.")
  })

  it("handles 'Things will get easier as time goes by.'", () => {
    const disguised = vm.concealWords("Things will get easier as time goes by.", [ "go", "by" ])
    expect(disguised).toBe("Things will get easier as time ~s ~.")
  })

  it("handles 'To instil confidence/discipline/fear into somebody'", () => {
    const disguised = vm.concealWords("To instil confidence/discipline/fear into somebody", [ "instill", "instil" ])
    expect(disguised).toBe("To ~ confidence/discipline/fear into somebody")
  })

  it("handles 'Highly innovative companies live by a set of key innovation philosophies that instill a deep, companywide commitment to innovation'", () => {
    const disguised = vm.concealWords("Highly innovative companies live by a set of key innovation philosophies that instill a deep, companywide commitment to innovation", [ "instill", "instil" ])
    expect(disguised).toBe("Highly innovative companies live by a set of key innovation philosophies that ~ a deep, companywide commitment to innovation")
  })

  it("handles 'Demand is outstripping supply'", () => {
    const disguised = vm.concealWords("Demand is outstripping supply", [ "outstrip" ])
    expect(disguised).toBe("Demand is ~ing supply")
  })

  it("handles 'She soon outstripped the slower runners'", () => {
    const disguised = vm.concealWords("She soon outstripped the slower runners", [ "outstrip" ])
    expect(disguised).toBe("She soon ~ed the slower runners")
  })

  it("handles 'She hated the dreariness of her everyday life'", () => {
    const disguised = vm.concealWords("She hated the dreariness of her everyday life", [ "dreary", "dull", "drearily", "dreariness" ])
    expect(disguised).toBe("She hated the ~ of her everyday life")
  })

  it("handles 'The dresses all looked drearily similar - I didn't like any of them'", () => {
    const disguised = vm.concealWords("The dresses all looked drearily similar - I didn't like any of them", [ "dreary", "dull", "drearily", "dreariness" ])
    expect(disguised).toBe("The dresses all looked ~ly similar - I didn't like any of them")
  })

  it("handles ''Goodbye and good riddance!' she said to him angrily as he left'", () => {
    const disguised = vm.concealWords("'Goodbye and good riddance!' she said to him angrily as he left", [ "good", "riddance" ])
    expect(disguised).toBe("'Goodbye and ~ ~!' she said to him angrily as he left")
  })

  it("handles '- Have you heard that Jim's leaving to go to another job? - Good riddance. He was always useless.'", () => {
    const disguised = vm.concealWords("- Have you heard that Jim's leaving to go to another job? - Good riddance. He was always useless.", [ "good", "riddance" ])
    expect(disguised).toBe("- Have you heard that Jim's leaving to go to another job? - ~ ~. He was always useless.")
  })

  it("handles 'Left you, did she? It serves you right for being so selfish'", () => {
    const disguised = vm.concealWords("Left you, did she? It serves you right for being so selfish", [ "it", "serves", "sb", "right", "for", "doing", "sth" ])
    expect(disguised).toBe("Left you, did she? ~ ~ you ~ ~ being so selfish")
  })

  it("handles '- I'm broke since I bought all those designers clothes. - Tough. It's your own fault. Serves you right.'", () => {
    const disguised = vm.concealWords("- I'm broke since I bought all those designers clothes. - Tough. It's your own fault. Serves you right.", [ "it", "serves", "sb", "right", "for", "doing", "sth" ])
    expect(disguised).toBe("- I'm broke since I bought all those designers clothes. - Tough. ~'s your own fault. ~ you ~.")
  })

  it("handles '- They might let us in without tickets. - Fat chance of that!'", () => {
    const disguised = vm.concealWords("- They might let us in without tickets. - Fat chance of that!", [ "a", "fat", "chance", "of", "sth", "doing" ])
    expect(disguised).toBe("- They might let us in without tickets. - ~ ~ ~ that!")
  })

  it("handles 'Fat chance you have of being able to afford a bike'", () => {
    const disguised = vm.concealWords("Fat chance you have of being able to afford a bike", [ "a", "fat", "chance", "of", "sth", "doing" ])
    expect(disguised).toBe("~ ~ you have ~ being able to afford ~ bike")
  })

  it("handles 'This decision should not be seen as immutable'", () => {
    const disguised = vm.concealWords("This decision should not be seen as immutable", [ "mutable", "mutability", "immutable" ])
    expect(disguised).toBe("This decision should not be seen as ~")
  })

  it("handles 'The relaxed ambience of the city'", () => {
    const disguised = vm.concealWords("The relaxed ambience of the city", [ "ambience", "ambiance" ])
    expect(disguised).toBe("The relaxed ~ of the city")
  })

  it("handles 'Low lighting for added ambience'", () => {
    const disguised = vm.concealWords("Low lighting for added ambience", [ "ambience", "ambiance" ])
    expect(disguised).toBe("Low lighting for added ~")
  })

  it("handles 'In contrast, Starbucks needs well-trained baristas because their chats with customers are intrinsic to its coffee shops' ambience'", () => {
    const disguised = vm.concealWords("In contrast, Starbucks needs well-trained baristas because their chats with customers are intrinsic to its coffee shops' ambience", [ "ambience", "ambiance" ])
    expect(disguised).toBe("In contrast, Starbucks needs well-trained baristas because their chats with customers are intrinsic to its coffee shops' ~")
  })

  it("handles 'I had a hard time getting him to pay up'", () => {
    const disguised = vm.concealWords("I had a hard time getting him to pay up", [ "pay", "up" ])
    expect(disguised).toBe("I had a hard time getting him to ~ ~")
  })

  it("handles 'A way of hedging against currency risks'", () => {
    const disguised = vm.concealWords("A way of hedging against currency risks", [ "hedge", "against", "sth" ])
    expect(disguised).toBe("A way of ~ing ~ currency risks")
  })

  it("handles 'To buy gold as a hedge against inflation'", () => {
    const disguised = vm.concealWords("To buy gold as a hedge against inflation", [ "hedge", "against", "sth" ])
    expect(disguised).toBe("To buy gold as a ~ ~ inflation")
  })

  it("handles 'Talent hedging – creating a talent portfolio optimized for a range of possible future conditions'", () => {
    const disguised = vm.concealWords("Talent hedging – creating a talent portfolio optimized for a range of possible future conditions", [ "hedge", "against", "sth" ])
    expect(disguised).toBe("Talent ~ing – creating a talent portfolio optimized for a range of possible future conditions")
  })

  it("handles 'Fooling him was as easy as pie.'", () => {
    const disguised = vm.concealWords("Fooling him was as easy as pie.", [ "as", "easy", "pie" ])
    expect(disguised).toBe("Fooling him was ~ ~ ~ ~.")
  })

  it("handles 'She tried in vain to point out to him the unfairness of his actions.'", () => {
    const disguised = vm.concealWords("She tried in vain to point out to him the unfairness of his actions.", [ "point", "out" ])
    expect(disguised).toBe("She tried in vain to ~ ~ to him the unfairness of his actions.")
  })

  it("handles 'He pointed out the dangers of driving alone.'", () => {
    const disguised = vm.concealWords("He pointed out the dangers of driving alone.", [ "point", "out" ])
    expect(disguised).toBe("He ~ed ~ the dangers of driving alone.")
  })

  it("handles 'It's not very far,’ she pointed out.'", () => {
    const disguised = vm.concealWords("It's not very far,’ she pointed out.", [ "point", "out" ])
    expect(disguised).toBe("It's not very far,’ she ~ed ~.")
  })

  it("handles 'She tried in vain to point out to him the unfairness of his actions.'", () => {
    const disguised = vm.concealWords("She tried in vain to point out to him the unfairness of his actions.", [ "in", "vain" ])
    expect(disguised).toBe("She tried ~ ~ to point out to him the unfairness of his actions.")
  })

  it("handles 'They tried in vain to persuade her to go.'", () => {
    const disguised = vm.concealWords("They tried in vain to persuade her to go.", [ "in", "vain" ])
    expect(disguised).toBe("They tried ~ ~ to persuade her to go.")
  })

  it("handles 'Pick up any newspaper on almost any day and you will read about how work is killing our marriages and depriving children of 'quality time'...'", () => {
    const disguised = vm.concealWords("Pick up any newspaper on almost any day and you will read about how work is killing our marriages and depriving children of 'quality time'...", [ "deprive" ])
    expect(disguised).toBe("Pick up any newspaper on almost any day and you will read about how work is killing our marriages and ~ing children of 'quality time'...")
  })

  it("handles 'She was mortified to realize he had heard every word she said.'", () => {
    const disguised = vm.concealWords("She was mortified to realize he had heard every word she said.", [ "mortify", "mortification", "mortifying" ])
    expect(disguised).toBe("She was ~ed to realize he had heard every word she said.")
  })

  it("handles 'Spend relaxing day amidst beautiful works of art.'", () => {
    const disguised = vm.concealWords("Spend relaxing day amidst beautiful works of art.", [ "amidst" ])
    expect(disguised).toBe("Spend relaxing day ~ beautiful works of art.")
  })

  it("handles 'I was stung on the arm by a wasp.'", () => {
    const disguised = vm.concealWords("I was stung on the arm by a wasp.", [ "sting", "stung" ])
    expect(disguised).toBe("I was ~ on the arm by a wasp.")
  })

  it("handles 'We can excuse his behaviour as youthful exuberance'", () => {
    const disguised = vm.concealWords("We can excuse his behaviour as youthful exuberance", [ "exuberant", "exuberance", "exuberantly" ])
    expect(disguised).toBe("We can excuse his behaviour as youthful ~")
  })

  it("handles 'Nothing will curb her natural exuberance'", () => {
    const disguised = vm.concealWords("Nothing will curb her natural exuberance", [ "exuberant", "exuberance", "exuberantly" ])
    expect(disguised).toBe("Nothing will curb her natural ~")
  })

  it("handles 'Speculating in gold can present enormous upsides with concomitantly disastrous downsides'", () => {
    const disguised = vm.concealWords("Speculating in gold can present enormous upsides with concomitantly disastrous downsides", [ "concomitant" ])
    expect(disguised).toBe("Speculating in gold can present enormous upsides with ~ly disastrous downsides")
  })

  it("handles 'I was just thinking about her when she phoned. Spooky!'", () => {
    const disguised = vm.concealWords("I was just thinking about her when she phoned. Spooky!", [ "spook", "spooky" ])
    expect(disguised).toBe("I was just thinking about her when she phoned. ~!")
  })

  it("handles 'A spooky old house'", () => {
    const disguised = vm.concealWords("A spooky old house", [ "spook", "spooky" ])
    expect(disguised).toBe("A ~ old house")
  })

  it("handles 'We've been out and about talking to people all over the country.'", () => {
    const disguised = vm.concealWords("We've been out and about talking to people all over the country.", [ "out", "and", "about" ])
    expect(disguised).toBe("We've been ~ ~ ~ talking to people all over the country.")
  })

  it("handles 'Julie is constantly out and about; she's a real social butterfly'", () => {
    const disguised = vm.concealWords("Julie is constantly out and about; she's a real social butterfly", [ "out", "and", "about" ])
    expect(disguised).toBe("Julie is constantly ~ ~ ~; she's a real social butterfly")
  })

  it("handles 'He shook his head feebly'", () => {
    const disguised = vm.concealWords("He shook his head feebly", [ "feeble", "feebly" ])
    expect(disguised).toBe("He shook his head ~")
  })

  it("handles 'Grunwald painstakingly recounts the background, genesis, formation and aftereffects of the law'", () => {
    const disguised = vm.concealWords("Grunwald painstakingly recounts the background, genesis, formation and aftereffects of the law", [ "painstaking", "thorough", "painstakingly" ])
    expect(disguised).toBe("Grunwald ~ recounts the background, genesis, formation and aftereffects of the law")
  })

  it("handles 'The building has been painstakingly restored to all its former elegance'", () => {
    const disguised = vm.concealWords("The building has been painstakingly restored to all its former elegance", [ "painstaking", "thorough", "painstakingly" ])
    expect(disguised).toBe("The building has been ~ restored to all its former elegance")
  })

  it("handles 'I'm a terrible hoarder of junk. I hate throwing things away'", () => {
    const disguised = vm.concealWords("I'm a terrible hoarder of junk. I hate throwing things away", [ "hoard", "hoarder" ])
    expect(disguised).toBe("I'm a terrible ~er of junk. I hate throwing things away")
  })

  it("handles 'They came within a whisker of being killed.'", () => {
    const disguised = vm.concealWords("They came within a whisker of being killed.", [ "within", "a", "whisker" ])
    expect(disguised).toBe("They came ~ ~ ~ of being killed.")
  })

  it("handles 'We live just a stone's throw from here.'", () => {
    const disguised = vm.concealWords("We live just a stone's throw from here.", [ "a", "stone's", "throw" ])
    expect(disguised).toBe("We live just ~ ~ ~ from here.")
  })

  it("handles 'The hotel is within a stone's throw of the beach.'", () => {
    const disguised = vm.concealWords("The hotel is within a stone's throw of the beach.", [ "a", "stone's", "throw" ])
    expect(disguised).toBe("The hotel is within ~ ~ ~ of the beach.")
  })

  it("handles 'Chemical weapons are banned internationally.'", () => {
    const disguised = vm.concealWords("Chemical weapons are banned internationally.", [ "ban" ])
    expect(disguised).toBe("Chemical weapons are ~ed internationally.")
  })

  it("handles 'He had an aura of invincibility'", () => {
    const disguised = vm.concealWords("He had an aura of invincibility", [ "invincible", "unconquerable", "invincibility" ])
    expect(disguised).toBe("He had an aura of ~")
  })

  it("handles 'But there's always some monkey in the wrench that makes life more complicated and more difficult'", () => {
    const disguised = vm.concealWords("But there's always some monkey in the wrench that makes life more complicated and more difficult", [ "throw", "a", "monkey", "wrench", "in", "into", "sth", "the" ])
    expect(disguised).toBe("But there's always some ~ ~ ~ ~ that makes life more complicated and more difficult")
  })

  it("handles 'Everything hinges on the outcome of these talks'", () => {
    const disguised = vm.concealWords("Everything hinges on the outcome of these talks", [ "hinge", "on", "upon", "sth" ])
    expect(disguised).toBe("Everything ~s ~ the outcome of these talks")
  })

  it("handles 'His success hinges on how well he does at the interview'", () => {
    const disguised = vm.concealWords("His success hinges on how well he does at the interview", [ "hinge", "on", "upon", "sth" ])
    expect(disguised).toBe("His success ~s ~ how well he does at the interview")
  })

  it("handles 'But the joke hinges on the idea that real martinis are always shaken, as Bond prefers, rather than stirred'", () => {
    const disguised = vm.concealWords("But the joke hinges on the idea that real martinis are always shaken, as Bond prefers, rather than stirred", [ "hinge", "on", "upon", "sth" ])
    expect(disguised).toBe("But the joke ~s ~ the idea that real martinis are always shaken, as Bond prefers, rather than stirred")
  })

  it("handles 'The erosion of her confidence'", () => {
    const disguised = vm.concealWords("The erosion of her confidence", [ "erode", "erosion" ])
    expect(disguised).toBe("The ~ of her confidence")
  })

  it("handles 'Soil erosion'", () => {
    const disguised = vm.concealWords("Soil erosion", [ "erode", "erosion" ])
    expect(disguised).toBe("Soil ~")
  })

  it("handles 'The entrance to the drain is covered by a heavy iron grating'", () => {
    const disguised = vm.concealWords("The entrance to the drain is covered by a heavy iron grating", [ "grate", "grating", "sewer", "drain" ])
    expect(disguised).toBe("The entrance to the ~ is covered by a heavy iron ~ing")
  })

  it("handles 'The company is reported to have liabilities of nearly 90000'", () => {
    const disguised = vm.concealWords("The company is reported to have liabilities of nearly 90000", [ "liability" ])
    expect(disguised).toBe("The company is reported to have ~s of nearly 90000")
  })

  it("handles 'Our financial advisers will concentrate on minimizing your tax liabilities and maximizing your income'", () => {
    const disguised = vm.concealWords("Our financial advisers will concentrate on minimizing your tax liabilities and maximizing your income", [ "liability" ])
    expect(disguised).toBe("Our financial advisers will concentrate on minimizing your tax ~s and maximizing your income")
  })

  it("handles 'She stressed the need for constant vigilance'", () => {
    const disguised = vm.concealWords("She stressed the need for constant vigilance", [ "vigilant", "alert", "watchful", "vigilance", "vigilantly" ])
    expect(disguised).toBe("She stressed the need for constant ~")
  })

  it("handles 'It's like buying anything else; you need to do your due diligence before plunking down your hard-earned filthy lucre'", () => {
    const disguised = vm.concealWords("It's like buying anything else; you need to do your due diligence before plunking down your hard-earned filthy lucre", [ "plunk", "down", "sth" ])
    expect(disguised).toBe("It's like buying anything else; you need to do your due diligence before ~ing ~ your hard-earned filthy lucre")
  })

  it("handles 'Her enthusiasm for the whole idea was waning rapidly'", () => {
    const disguised = vm.concealWords("Her enthusiasm for the whole idea was waning rapidly", [ "wane", "decrease", "fade" ])
    expect(disguised).toBe("Her enthusiasm for the whole idea was ~ing rapidly")
  })

  it("handles 'Yup. It wasn't a noble defeat. It was ignominiously choked to death by red tape'", () => {
    const disguised = vm.concealWords("Yup. It wasn't a noble defeat. It was ignominiously choked to death by red tape", [ "ignominious", "red", "tape", "disgraceful", "humiliating" ])
    expect(disguised).toBe("Yup. It wasn't a noble defeat. It was ~ly choked to death by ~ ~")
  })

  it("handles 'rice, flour and other basic commodities'", () => {
    const disguised = vm.concealWords("rice, flour and other basic commodities", [ "commodity", "product,", "goods,", "merchandise" ])
    expect(disguised).toBe("rice, flour and other basic ~s")
  })

  it("handles 'While most of us would expect that regional weather conditions might affect the availability and price of local commodities, few of us actually realize how interconnected global commerce today really is.'", () => {
    const disguised = vm.concealWords("While most of us would expect that regional weather conditions might affect the availability and price of local commodities, few of us actually realize how interconnected global commerce today really is.", [ "commodity", "product,", "goods,", "merchandise" ])
    expect(disguised).toBe("While most of us would expect that regional weather conditions might affect the availability and price of local ~s, few of us actually realize how interconnected global commerce today really is.")
  })

  it("handles 'The victims were not referred to by name.'", () => {
    const disguised = vm.concealWords("The victims were not referred to by name.", [ "refer" ])
    expect(disguised).toBe("The victims were not ~ed to by name.")
  })

  it("handles 'She always referred to Ben as ‘that nice man’.'", () => {
    const disguised = vm.concealWords("She always referred to Ben as ‘that nice man’.", [ "refer" ])
    expect(disguised).toBe("She always ~ed to Ben as ‘that nice man’.")
  })

  it("handles 'Project managers should view complex projects holistically, not as a combination of separate components'", () => {
    const disguised = vm.concealWords("Project managers should view complex projects holistically, not as a combination of separate components", [ "holistic", "holistically" ])
    expect(disguised).toBe("Project managers should view complex projects ~, not as a combination of separate components")
  })

  it("handles 'a country ravaged by civil war'", () => {
    const disguised = vm.concealWords("a country ravaged by civil war", [ "ravage", "devastate" ])
    expect(disguised).toBe("a country ~ed by civil war")
  })

  it("handles 'Angola, a country ravaged by a 27-year civil war which left millions homeless, is now moving out of the dark ages into a post-war rejuvenation period.'", () => {
    const disguised = vm.concealWords("Angola, a country ravaged by a 27-year civil war which left millions homeless, is now moving out of the dark ages into a post-war rejuvenation period.", [ "ravage", "devastate" ])
    expect(disguised).toBe("Angola, a country ~ed by a 27-year civil war which left millions homeless, is now moving out of the dark ages into a post-war rejuvenation period.")
  })

  it("handles 'I finally spotted my friend in the crowd.'", () => {
    const disguised = vm.concealWords("I finally spotted my friend in the crowd.", [ "spot" ])
    expect(disguised).toBe("I finally ~ed my friend in the crowd.")
  })

  it("handles 'I've just spotted a mistake on the front cover.'", () => {
    const disguised = vm.concealWords("I've just spotted a mistake on the front cover.", [ "spot" ])
    expect(disguised).toBe("I've just ~ed a mistake on the front cover.")
  })

  it("handles 'Neighbours spotted smoke coming out of the house.'", () => {
    const disguised = vm.concealWords("Neighbours spotted smoke coming out of the house.", [ "spot" ])
    expect(disguised).toBe("Neighbours ~ed smoke coming out of the house.")
  })

  it("handles 'The team is bidding to retain its place in the league.'", () => {
    const disguised = vm.concealWords("The team is bidding to retain its place in the league.", [ "bid" ])
    expect(disguised).toBe("The team is ~ing to retain its place in the league.")
  })

  it("handles ' We wanted to buy the chairs but another couple were bidding against us.'", () => {
    const disguised = vm.concealWords(" We wanted to buy the chairs but another couple were bidding against us.", [ "bid" ])
    expect(disguised).toBe(" We wanted to buy the chairs but another couple were ~ing against us.")
  })

  it("handles 'There's room for another one if you move up a bit.'", () => {
    const disguised = vm.concealWords("There's room for another one if you move up a bit.", [ "move", "over" ])
    expect(disguised).toBe("There's room for another one if you ~ up a bit.")
  })

  it("handles 'He told a traffic police officer something along the lines of 'move over' and began manning the traffic himself in order to speed it up.'", () => {
    const disguised = vm.concealWords("He told a traffic police officer something along the lines of 'move over' and began manning the traffic himself in order to speed it up.", [ "move", "over" ])
    expect(disguised).toBe("He told a traffic police officer something along the lines of '~ ~' and began manning the traffic himself in order to speed it up.")
  })

  it("handles 'Those aren't his exact words, but he said something along those lines'", () => {
    const disguised = vm.concealWords("Those aren't his exact words, but he said something along those lines", [ "along", "the", "lines" ])
    expect(disguised).toBe("Those aren't his exact words, but he said something ~ those ~")
  })

  it("handles 'The new system will operate along the same lines as the old one. = in the way that is mentioned'", () => {
    const disguised = vm.concealWords("The new system will operate along the same lines as the old one. = in the way that is mentioned", [ "along", "the", "lines" ])
    expect(disguised).toBe("~ new system will operate ~ ~ same ~ as ~ old one. = in ~ way that is mentioned")
  })

  it("handles 'I wonder if the press will put the boot in?'", () => {
    const disguised = vm.concealWords("I wonder if the press will put the boot in?", [ "put", "the", "boot", "in" ])
    expect(disguised).toBe("I wonder if ~ press will ~ ~ ~ ~?")
  })

  it("handles 'He put the boot in, when he announced that it was much easier to organize an event in the middle of nowhere, in reference to Salt Lake.City'", () => {
    const disguised = vm.concealWords("He put the boot in, when he announced that it was much easier to organize an event in the middle of nowhere, in reference to Salt Lake.City", [ "put", "the", "boot", "in" ])
    expect(disguised).toBe("He ~ ~ ~ ~, when he announced that it was much easier to organize an event ~ ~ middle of nowhere, ~ reference to Salt Lake.City")
  })

  it("handles 'Think carefully before you resign—you don't want to burn your bridges.'", () => {
    const disguised = vm.concealWords("Think carefully before you resign—you don't want to burn your bridges.", [ "burn", "bridges" ])
    expect(disguised).toBe("Think carefully before you resign—you don't want to ~ your ~.")
  })

  it("handles 'He unintentionally burned important bridges with his arrogance.'", () => {
    const disguised = vm.concealWords("He unintentionally burned important bridges with his arrogance.", [ "burn", "bridges" ])
    expect(disguised).toBe("He unintentionally ~ important ~ with his arrogance.")
  })

  it("handles 'Fretting about it won't help'", () => {
    const disguised = vm.concealWords("Fretting about it won't help", [ "fret" ])
    expect(disguised).toBe("~ing about it won't help")
  })

  it("handles 'He wasn't able to cope with the stresses and strains of the job.'", () => {
    const disguised = vm.concealWords("He wasn't able to cope with the stresses and strains of the job.", [ "cope", "with", "manage" ])
    expect(disguised).toBe("He wasn't able to ~ ~ the stresses and strains of the job.")
  })

  it("handles 'Desert plants are adapted to cope with extreme heat.'", () => {
    const disguised = vm.concealWords("Desert plants are adapted to cope with extreme heat.", [ "cope", "with", "manage" ])
    expect(disguised).toBe("Desert plants are adapted to ~ ~ extreme heat.")
  })

  it("handles 'A good way to discover the reality of retirement is to find out how retired relatives have coped with their finances.'", () => {
    const disguised = vm.concealWords("A good way to discover the reality of retirement is to find out how retired relatives have coped with their finances.", [ "cope", "with", "manage" ])
    expect(disguised).toBe("A good way to discover the reality of retirement is to find out how retired relatives have ~ed ~ their finances.")
  })

  it("handles 'the ins and outs of the problem'", () => {
    const disguised = vm.concealWords("the ins and outs of the problem", [ "the", "ins", "and", "outs" ])
    expect(disguised).toBe("~ ~ ~ ~ of ~ problem")
  })

  it("handles 'He quickly learned the ins and outs of the job.'", () => {
    const disguised = vm.concealWords("He quickly learned the ins and outs of the job.", [ "the", "ins", "and", "outs" ])
    expect(disguised).toBe("He quickly learned ~ ~ ~ ~ of ~ job.")
  })

  it("handles 'to live on social security'", () => {
    const disguised = vm.concealWords("to live on social security", [ "social", "security" ])
    expect(disguised).toBe("to live on ~ ~")
  })

  it("handles 'social security payments'", () => {
    const disguised = vm.concealWords("social security payments", [ "social", "security" ])
    expect(disguised).toBe("~ ~ payments")
  })

  it("handles 'to be on paid sick leave'", () => {
    const disguised = vm.concealWords("to be on paid sick leave", [ "sick", "leave" ])
    expect(disguised).toBe("to be on paid ~ ~")
  })

  it("handles 'I believe providing paid sick leave to hardworking families is a worthy and admirable goal, one I would like to make available for all.'", () => {
    const disguised = vm.concealWords("I believe providing paid sick leave to hardworking families is a worthy and admirable goal, one I would like to make available for all.", [ "provide", "supply" ])
    expect(disguised).toBe("I believe ~ing paid sick leave to hardworking families is a worthy and admirable goal, one I would like to make available for all.")
  })

  it("handles 'Many companies fail through poor cash flow.'", () => {
    const disguised = vm.concealWords("Many companies fail through poor cash flow.", [ "cash", "flow" ])
    expect(disguised).toBe("Many companies fail through poor ~ ~.")
  })

  it("handles 'cash-flow problems'", () => {
    const disguised = vm.concealWords("cash-flow problems", [ "cash", "flow" ])
    expect(disguised).toBe("~-~ problems")
  })

  it("handles 'a mechanic who buys and sells cars on the side'", () => {
    const disguised = vm.concealWords("a mechanic who buys and sells cars on the side", [ "on", "the", "side" ])
    expect(disguised).toBe("a mechanic who buys and sells cars ~ ~ ~")
  })

  it("handles 'jobs on the side could be a good way to making ends meet...'", () => {
    const disguised = vm.concealWords("jobs on the side could be a good way to making ends meet...", [ "on", "the", "side" ])
    expect(disguised).toBe("jobs ~ ~ ~ could be a good way to making ends meet...")
  })

  it("handles 'jobs on the side could be a good way to making ends meet...'", () => {
    const disguised = vm.concealWords("jobs on the side could be a good way to making ends meet...", [ "make", "ends", "meet" ])
    expect(disguised).toBe("jobs on the side could be a good way to ~ing ~ ~...")
  })

  it("handles 'Many families struggle to make ends meet.'", () => {
    const disguised = vm.concealWords("Many families struggle to make ends meet.", [ "make", "ends", "meet" ])
    expect(disguised).toBe("Many families struggle to ~ ~ ~.")
  })

  it("handles 'It's my first trip abroad so I'm going to make the most of it.'", () => {
    const disguised = vm.concealWords("It's my first trip abroad so I'm going to make the most of it.", [ "make", "the", "most", "of", "sth" ])
    expect(disguised).toBe("It's my first trip abroad so I'm going to ~ ~ ~ ~ it.")
  })

  it("handles 'She doesn't know how to make the most of herself (= make herself appear in the best possible way).'", () => {
    const disguised = vm.concealWords("She doesn't know how to make the most of herself (= make herself appear in the best possible way).", [ "make", "the", "most", "of", "sth" ])
    expect(disguised).toBe("She doesn't know how to ~ ~ ~ ~ herself (= ~ herself appear in ~ best possible way).")
  })

  it("handles 'Making the most of marketing'", () => {
    const disguised = vm.concealWords("Making the most of marketing", [ "make", "the", "most", "of", "sth" ])
    expect(disguised).toBe("~ing ~ ~ ~ marketing")
  })

  it("handles 'Twitter is integrated with Facebook, so there is no need to waste valuable minutes updating both sites.'", () => {
    const disguised = vm.concealWords("Twitter is integrated with Facebook, so there is no need to waste valuable minutes updating both sites.", [ "update", "bring", "up", "to", "date" ])
    expect(disguised).toBe("Twitter is integrated with Facebook, so there is no need ~ waste valuable minutes ~ing both sites.")
  })

  it("handles 'I posted a question on the message board.'", () => {
    const disguised = vm.concealWords("I posted a question on the message board.", [ "message", "board" ])
    expect(disguised).toBe("I posted a question on the ~ ~.")
  })

  it("handles 'I spent all weekend grading papers.'", () => {
    const disguised = vm.concealWords("I spent all weekend grading papers.", [ "grade", "mark" ])
    expect(disguised).toBe("I spent all weekend ~ing papers.")
  })

  it("handles 'Her early work is exemplified in her book, ‘A Study of Children's Minds’.'", () => {
    const disguised = vm.concealWords("Her early work is exemplified in her book, ‘A Study of Children's Minds’.", [ "exemplify", "illustrate", "exemplification" ])
    expect(disguised).toBe("Her early work is ~ed in her book, ‘A Study of Children's Minds’.")
  })

  it("handles 'His food exemplifies Italian cooking at its best.'", () => {
    const disguised = vm.concealWords("His food exemplifies Italian cooking at its best.", [ "exemplify", "illustrate", "exemplification" ])
    expect(disguised).toBe("His food ~s Italian cooking at its best.")
  })

  it("handles 'Symptoms include diarrhoea and vomiting'", () => {
    const disguised = vm.concealWords("Symptoms include diarrhoea and vomiting", [ "diarrhoea", "diarrhea", "the", "runs" ])
    expect(disguised).toBe("Symptoms include ~ and vomiting")
  })

  it("handles 'to lose money on the stock exchange'", () => {
    const disguised = vm.concealWords("to lose money on the stock exchange", [ "stock", "exchange" ])
    expect(disguised).toBe("to lose money on the ~ ~")
  })

  it("handles 'He spent that year commuting between New York and Chicago.'", () => {
    const disguised = vm.concealWords("He spent that year commuting between New York and Chicago.", [ "commute" ])
    expect(disguised).toBe("He spent that year ~ing between New York and Chicago.")
  })

  it("handles 'She strode past him without a backward glance.'", () => {
    const disguised = vm.concealWords("She strode past him without a backward glance.", [ "stride", "strode" ])
    expect(disguised).toBe("She ~ past him without a backward glance.")
  })

  it("handles 'We strode across the snowy fields.'", () => {
    const disguised = vm.concealWords("We strode across the snowy fields.", [ "stride", "strode" ])
    expect(disguised).toBe("We ~ across the snowy fields.")
  })

  it("handles 'She came striding along to meet me.'", () => {
    const disguised = vm.concealWords("She came striding along to meet me.", [ "stride", "strode" ])
    expect(disguised).toBe("She came ~ing along to meet me.")
  })

  it("handles 'customs/excise/import duties'", () => {
    const disguised = vm.concealWords("customs/excise/import duties", [ "duty" ])
    expect(disguised).toBe("customs/excise/import ~s")
  })

  it("handles 'The report is underpinned by extensive research.'", () => {
    const disguised = vm.concealWords("The report is underpinned by extensive research.", [ "underpin" ])
    expect(disguised).toBe("The report is ~ed by extensive research.")
  })

  it("handles 'Emergency services looked for possible victims buried under the debris.'", () => {
    const disguised = vm.concealWords("Emergency services looked for possible victims buried under the debris.", [ "bury" ])
    expect(disguised).toBe("Emergency services looked for possible victims ~ed under the debris.")
  })

  it("handles 'She's 85 and has buried three husbands.'", () => {
    const disguised = vm.concealWords("She's 85 and has buried three husbands.", [ "bury" ])
    expect(disguised).toBe("She's 85 and has ~ed three husbands.")
  })

  it("handles 'He was buried in Highgate Cemetery.'", () => {
    const disguised = vm.concealWords("He was buried in Highgate Cemetery.", [ "bury" ])
    expect(disguised).toBe("He was ~ed in Highgate Cemetery.")
  })

  it("handles 'He undertook to finish the job by Friday.=agree'", () => {
    const disguised = vm.concealWords("He undertook to finish the job by Friday.=agree", [ "undertake" ])
    expect(disguised).toBe("He ~ to finish the job by Friday.=agree")
  })

  it("handles 'This enabled longer distances, and faster journeys to be undertaken to destinations in neighbouring indonesia.'", () => {
    const disguised = vm.concealWords("This enabled longer distances, and faster journeys to be undertaken to destinations in neighbouring indonesia.", [ "undertake" ])
    expect(disguised).toBe("This enabled longer distances, and faster journeys to be ~ to destinations in neighbouring indonesia.")
  })

  it("handles 'The Belgian actor Jean–Claude Van Damme has been dubbed ‘Muscles from Brussels’.'", () => {
    const disguised = vm.concealWords("The Belgian actor Jean–Claude Van Damme has been dubbed ‘Muscles from Brussels’.", [ "dub" ])
    expect(disguised).toBe("The Belgian actor Jean–Claude Van Damme has been ~ed ‘Muscles from Brussels’.")
  })

  it("handles 'one of the remotest areas of the world'", () => {
    const disguised = vm.concealWords("one of the remotest areas of the world", [ "remote" ])
    expect(disguised).toBe("one of the ~est areas of the world")
  })

  it("handles 'The government was accused of propping up declining industries.'", () => {
    const disguised = vm.concealWords("The government was accused of propping up declining industries.", [ "prop", "up", "shore" ])
    expect(disguised).toBe("The government was accused of ~ing ~ declining industries.")
  })

  it("handles '... Island of St Helena is so remote that even pirates of old are not unable to locate it, with a population of 4000, is still propped up by the UK taxpayer at an estimated cost of GBP 30 per year.'", () => {
    const disguised = vm.concealWords("... Island of St Helena is so remote that even pirates of old are not unable to locate it, with a population of 4000, is still propped up by the UK taxpayer at an estimated cost of GBP 30 per year.", [ "prop", "up", "shore" ])
    expect(disguised).toBe("... Island of St Helena is so remote that even pirates of old are not unable to locate it, with a population of 4000, is still ~ed ~ by the UK taxpayer at an estimated cost of GBP 30 per year.")
  })

  it("handles 'My mother underwent major surgery last year.'", () => {
    const disguised = vm.concealWords("My mother underwent major surgery last year.", [ "undergo", "underwent", "undergone" ])
    expect(disguised).toBe("My mother ~ major surgery last year.")
  })

  it("handles 'A seriously ill woman who was denied an abortion by the Supreme Court in El Salvador has undergone a premature Caesarean section.'", () => {
    const disguised = vm.concealWords("A seriously ill woman who was denied an abortion by the Supreme Court in El Salvador has undergone a premature Caesarean section.", [ "undergo", "underwent", "undergone" ])
    expect(disguised).toBe("A seriously ill woman who was denied an abortion by the Supreme Court in El Salvador has ~ a premature Caesarean section.")
  })

  it("handles 'A cozy little room'", () => {
    const disguised = vm.concealWords("A cozy little room", [ "cozy", "cosy", "snug" ])
    expect(disguised).toBe("A ~ little room")
  })

  it("handles 'I felt warm and cozy sitting by the fire'", () => {
    const disguised = vm.concealWords("I felt warm and cozy sitting by the fire", [ "cozy", "cosy", "snug" ])
    expect(disguised).toBe("I felt warm and ~ sitting by the fire")
  })

  it("handles 'I heard a child sobbing loudly'", () => {
    const disguised = vm.concealWords("I heard a child sobbing loudly", [ "sob", "łkać" ])
    expect(disguised).toBe("I heard a child ~ing loudly")
  })

  it("handles 'Stop whining!'", () => {
    const disguised = vm.concealWords("Stop whining!", [ "whine", "whiny" ])
    expect(disguised).toBe("Stop ~ing!")
  })

  it("handles 'Code deobfuscation'", () => {
    const disguised = vm.concealWords("Code deobfuscation", [ "obfuscate", "obscure", "obfuscation", "deobfuscation" ])
    expect(disguised).toBe("Code ~")
  })

  it("handles 'Rank-and-file employees'", () => {
    const disguised = vm.concealWords("Rank-and-file employees", [ "the", "rank", "and", "file", "rank-and-file" ])
    expect(disguised).toBe("~ employees")
  })

  it("handles 'The rank and file of the workforce'", () => {
    const disguised = vm.concealWords("The rank and file of the workforce", [ "the", "rank", "and", "file", "rank-and-file" ])
    expect(disguised).toBe("~ ~ ~ ~ of ~ workforce")
  })

  it("handles 'We are hoping to tie up the deal by tomorrow'", () => {
    const disguised = vm.concealWords("We are hoping to tie up the deal by tomorrow", [ "tie", "sth", "up" ])
    expect(disguised).toBe("We are hoping to ~ ~ the deal by tomorrow")
  })

  it("handles 'I went into the office for an hour to tie up any loose ends (= finish remaining small jobs)'", () => {
    const disguised = vm.concealWords("I went into the office for an hour to tie up any loose ends (= finish remaining small jobs)", [ "tie", "sth", "up" ])
    expect(disguised).toBe("I went into the office for an hour to ~ ~ any loose ends (= finish remaining small jobs)")
  })

  it("handles 'Make yourself as indispensable as possible by actively tying up loose ends and helping with others' work'", () => {
    const disguised = vm.concealWords("Make yourself as indispensable as possible by actively tying up loose ends and helping with others' work", [ "tie", "sth", "up" ])
    expect(disguised).toBe("Make yourself as indispensable as possible by actively tying ~ loose ends and helping with others' work")
  })

  it("handles 'This situation is easily remedied.'", () => {
    const disguised = vm.concealWords("This situation is easily remedied.", [ "remedy", "put", "right" ])
    expect(disguised).toBe("This situation is easily ~ed.")
  })

  it("handles '1. She's been popping pills for months.'", () => {
    const disguised = vm.concealWords("1. She's been popping pills for months.", [ "pop" ])
    expect(disguised).toBe("1. She's been ~ing pills for months.")
  })

  it("handles '2. the sound of corks popping'", () => {
    const disguised = vm.concealWords("2. the sound of corks popping", [ "pop" ])
    expect(disguised).toBe("2. the sound of corks ~ing")
  })

  it("handles 'These tablets are available over the counter.'", () => {
    const disguised = vm.concealWords("These tablets are available over the counter.", [ "over", "the", "counter" ])
    expect(disguised).toBe("These tablets are available ~ ~ ~.")
  })

  it("handles 'A democracy could be upheld peacefully.'", () => {
    const disguised = vm.concealWords("A democracy could be upheld peacefully.", [ "uphold", "upheld" ])
    expect(disguised).toBe("A democracy could be ~ peacefully.")
  })

  it("handles 'The scientist was doggedly persistent in his search for a cure for cancer.'", () => {
    const disguised = vm.concealWords("The scientist was doggedly persistent in his search for a cure for cancer.", [ "dogged", "tenacious" ])
    expect(disguised).toBe("The scientist was ~ly persistent in his search for a cure for cancer.")
  })

  it("handles 'Completed projects must be submitted by 10 March.'", () => {
    const disguised = vm.concealWords("Completed projects must be submitted by 10 March.", [ "submit" ])
    expect(disguised).toBe("Completed projects must be ~ed by 10 March.")
  })

  it("handles 'The campsite is close to all local amenities.'", () => {
    const disguised = vm.concealWords("The campsite is close to all local amenities.", [ "amenity" ])
    expect(disguised).toBe("The campsite is close to all local ~s.")
  })

  it("handles 'Many of the houses lacked even basic amenities (= baths, showers, hot water, etc.).'", () => {
    const disguised = vm.concealWords("Many of the houses lacked even basic amenities (= baths, showers, hot water, etc.).", [ "amenity" ])
    expect(disguised).toBe("Many of the houses lacked even basic ~s (= baths, showers, hot water, etc.).")
  })

  it("handles '... it is now up to date with modern amenities... na bieżąco'", () => {
    const disguised = vm.concealWords("... it is now up to date with modern amenities... na bieżąco", [ "amenity" ])
    expect(disguised).toBe("... it is now up to date with modern ~s... na bieżąco")
  })

  it("handles 'Add a dash of lemon juice.'", () => {
    const disguised = vm.concealWords("Add a dash of lemon juice.", [ "a", "dash", "of", "sth" ])
    expect(disguised).toBe("Add ~ ~ ~ lemon juice.")
  })

  it("handles 'The rug adds a dash of colour to the room.'", () => {
    const disguised = vm.concealWords("The rug adds a dash of colour to the room.", [ "a", "dash", "of", "sth" ])
    expect(disguised).toBe("The rug adds ~ ~ ~ colour to the room.")
  })

  it("handles 'The album is a mixture of rock and gospel, with a dash of jazz thrown in.'", () => {
    const disguised = vm.concealWords("The album is a mixture of rock and gospel, with a dash of jazz thrown in.", [ "a", "dash", "of", "sth" ])
    expect(disguised).toBe("The album is ~ mixture ~ rock and gospel, with ~ ~ ~ jazz thrown in.")
  })

  it("handles 'a bar of chocolate/soap'", () => {
    const disguised = vm.concealWords("a bar of chocolate/soap", [ "a", "bar", "of", "sth" ])
    expect(disguised).toBe("~ ~ ~ chocolate/soap")
  })

  it("handles 'a dollop of whipped cream'", () => {
    const disguised = vm.concealWords("a dollop of whipped cream", [ "a", "dollop", "of", "sth" ])
    expect(disguised).toBe("~ ~ ~ whipped cream")
  })

  it("handles 'A dollop of romance now and then is good for everybody.'", () => {
    const disguised = vm.concealWords("A dollop of romance now and then is good for everybody.", [ "a", "dollop", "of", "sth" ])
    expect(disguised).toBe("~ ~ ~ romance now and then is good for everybody.")
  })

  it("handles 'a pinch of salt'", () => {
    const disguised = vm.concealWords("a pinch of salt", [ "a", "pinch", "of", "sth" ])
    expect(disguised).toBe("~ ~ ~ salt")
  })

  it("handles 'a chunk of cheese/masonry'", () => {
    const disguised = vm.concealWords("a chunk of cheese/masonry", [ "a", "chunk", "of", "sth" ])
    expect(disguised).toBe("~ ~ ~ cheese/masonry")
  })

  it("handles 'I've already written a fair chunk of the article.'", () => {
    const disguised = vm.concealWords("I've already written a fair chunk of the article.", [ "a", "chunk", "of", "sth" ])
    expect(disguised).toBe("I've already written ~ fair ~ ~ the article.")
  })

  it("handles 'We'd better get a couple of extra pints (= of milk) tomorrow.'", () => {
    const disguised = vm.concealWords("We'd better get a couple of extra pints (= of milk) tomorrow.", [ "a", "pint", "of", "sth" ])
    expect(disguised).toBe("We'd better get ~ couple ~ extra ~s (= ~ milk) tomorrow.")
  })

  it("handles 'Add half a pint of cream.'", () => {
    const disguised = vm.concealWords("Add half a pint of cream.", [ "a", "pint", "of", "sth" ])
    expect(disguised).toBe("Add half ~ ~ ~ cream.")
  })

  it("handles 'Do you want to go for a pint later?'", () => {
    const disguised = vm.concealWords("Do you want to go for a pint later?", [ "a", "pint", "of", "sth" ])
    expect(disguised).toBe("Do you want to go for ~ ~ later?")
  })

  it("handles 'a pint of beer (especially in a pub)'", () => {
    const disguised = vm.concealWords("a pint of beer (especially in a pub)", [ "a", "pint", "of", "sth" ])
    expect(disguised).toBe("~ ~ ~ beer (especially in ~ pub)")
  })

  it("handles 'a grain of salt/sand/sugar'", () => {
    const disguised = vm.concealWords("a grain of salt/sand/sugar", [ "a", "grain", "of", "sth" ])
    expect(disguised).toBe("~ ~ ~ salt/sand/sugar")
  })

  it("handles 'There isn't a grain of truth in those rumours.'", () => {
    const disguised = vm.concealWords("There isn't a grain of truth in those rumours.", [ "a", "grain", "of", "sth" ])
    expect(disguised).toBe("There isn't ~ ~ ~ truth in those rumours.")
  })

  it("handles 'We drank a can of Coke each.'", () => {
    const disguised = vm.concealWords("We drank a can of Coke each.", [ "a", "can", "of", "sth" ])
    expect(disguised).toBe("We drank ~ ~ ~ Coke each.")
  })

  it("handles 'a beer/paint can'", () => {
    const disguised = vm.concealWords("a beer/paint can", [ "a", "can", "of", "sth" ])
    expect(disguised).toBe("~ beer/paint ~")
  })

  it("handles 'a can of hairspray'", () => {
    const disguised = vm.concealWords("a can of hairspray", [ "a", "can", "of", "sth" ])
    expect(disguised).toBe("~ ~ ~ hairspray")
  })

  it("handles 'a fried egg and two rashers of bacon'", () => {
    const disguised = vm.concealWords("a fried egg and two rashers of bacon", [ "a", "rasher", "of", "sth", "slice" ])
    expect(disguised).toBe("~ fried egg and two ~s ~ bacon")
  })

  it("handles 'a tasty morsel of food'", () => {
    const disguised = vm.concealWords("a tasty morsel of food", [ "a", "morsel", "of", "sth" ])
    expect(disguised).toBe("~ tasty ~ ~ food")
  })

  it("handles 'He ate it all, down to the last morsel.'", () => {
    const disguised = vm.concealWords("He ate it all, down to the last morsel.", [ "a", "morsel", "of", "sth" ])
    expect(disguised).toBe("He ate it all, down to the last ~.")
  })

  it("handles 'catholic Church at the crossroads?'", () => {
    const disguised = vm.concealWords("catholic Church at the crossroads?", [ "at", "the", "crossroads" ])
    expect(disguised).toBe("catholic Church ~ ~ ~?")
  })

  it("handles 'The oldest of the aircraft were scrapped.'", () => {
    const disguised = vm.concealWords("The oldest of the aircraft were scrapped.", [ "scrap" ])
    expect(disguised).toBe("The oldest of the aircraft were ~ed.")
  })

  it("handles 'Some believers have baulked at (wzdragać się) paying the figure and have declared themselves as not subscribing to any specific religion and therefore avoiding the fee.'", () => {
    const disguised = vm.concealWords("Some believers have baulked at (wzdragać się) paying the figure and have declared themselves as not subscribing to any specific religion and therefore avoiding the fee.", [ "subscribe", "believe", "in", "something" ])
    expect(disguised).toBe("Some believers have baulked at (wzdragać się) paying the figure and have declared themselves as not ~ing to any specific religion and therefore avoiding the fee.")
  })

  it("handles 'She sat there, sipping at her tea'", () => {
    const disguised = vm.concealWords("She sat there, sipping at her tea", [ "sip" ])
    expect(disguised).toBe("She sat there, ~ing at her tea")
  })

  it("handles 'The kids seem to be guzzling soft drinks all day.'", () => {
    const disguised = vm.concealWords("The kids seem to be guzzling soft drinks all day.", [ "guzzle" ])
    expect(disguised).toBe("The kids seem to be ~ing soft drinks all day.")
  })

  it("handles 'They talk about politics constantly.'", () => {
    const disguised = vm.concealWords("They talk about politics constantly.", [ "talk", "about", "gossip", "sb", "consider" ])
    expect(disguised).toBe("They ~ ~ politics constantly.")
  })

  it("handles 'Stop behaving like that or the neighbors will start to talk about you.'", () => {
    const disguised = vm.concealWords("Stop behaving like that or the neighbors will start to talk about you.", [ "talk", "about", "gossip", "sb", "consider" ])
    expect(disguised).toBe("Stop behaving like that or the neighbors will start to ~ ~ you.")
  })

  it("handles 'You can't have a real conversation with him - he just talks at you all the time.'", () => {
    const disguised = vm.concealWords("You can't have a real conversation with him - he just talks at you all the time.", [ "talk", "at" ])
    expect(disguised).toBe("You can't have a real conversation with him - he just ~s ~ you all the time.")
  })

  it("handles 'I've never had a real conversation with Peter; he just talks at you.'", () => {
    const disguised = vm.concealWords("I've never had a real conversation with Peter; he just talks at you.", [ "talk", "at" ])
    expect(disguised).toBe("I've never had a real conversation with Peter; he just ~s ~ you.")
  })

  it("handles 'He insisted that children who talk back ought to be punished.'", () => {
    const disguised = vm.concealWords("He insisted that children who talk back ought to be punished.", [ "talk", "back" ])
    expect(disguised).toBe("He insisted that children who ~ ~ ought to be punished.")
  })

  it("handles 'Our boss talks down to us as if we were children.'", () => {
    const disguised = vm.concealWords("Our boss talks down to us as if we were children.", [ "talk", "down", "to" ])
    expect(disguised).toBe("Our boss ~s ~ ~ us as if we were children.")
  })

  it("handles 'You can't talk me into giving you more money. I've given you enough already.'", () => {
    const disguised = vm.concealWords("You can't talk me into giving you more money. I've given you enough already.", [ "talk", "into" ])
    expect(disguised).toBe("You can't ~ me ~ giving you more money. I've given you enough already.")
  })

  it("handles 'I didn't want to move abroad but Bill talked me into it.'", () => {
    const disguised = vm.concealWords("I didn't want to move abroad but Bill talked me into it.", [ "talk", "into" ])
    expect(disguised).toBe("I didn't want to move abroad but Bill ~ed me ~ it.")
  })

  it("handles 'She thought her ideas out carefully before putting them down on paper.'", () => {
    const disguised = vm.concealWords("She thought her ideas out carefully before putting them down on paper.", [ "talk", "out" ])
    expect(disguised).toBe("She thought her ideas ~ carefully before putting them down on paper.")
  })

  it("handles 'Jane was so determined to become a model that her parents couldn't talk her out of it.'", () => {
    const disguised = vm.concealWords("Jane was so determined to become a model that her parents couldn't talk her out of it.", [ "talk", "out", "of" ])
    expect(disguised).toBe("Jane was so determined to become a model that her parents couldn't ~ her ~ ~ it.")
  })

  it("handles 'He was againts the plan at first, but they managed to talk him round.'", () => {
    const disguised = vm.concealWords("He was againts the plan at first, but they managed to talk him round.", [ "talk", "round" ])
    expect(disguised).toBe("He was againts the plan at first, but they managed to ~ him ~.")
  })

  it("handles 'We finally managed to talk them round to our way of thinking.'", () => {
    const disguised = vm.concealWords("We finally managed to talk them round to our way of thinking.", [ "talk", "round" ])
    expect(disguised).toBe("We finally managed to ~ them ~ to our way of thinking.")
  })

  it("handles 'His lack of a convincing alibi will tell against him at the trial.'", () => {
    const disguised = vm.concealWords("His lack of a convincing alibi will tell against him at the trial.", [ "tell", "against" ])
    expect(disguised).toBe("His lack of a convincing alibi will ~ ~ him at the trial.")
  })

  it("handles 'Her lack of experience told against her.'", () => {
    const disguised = vm.concealWords("Her lack of experience told against her.", [ "tell", "against" ])
    expect(disguised).toBe("Her lack of experience ~ ~ her.")
  })

  it("handles 'The only way one can tell the twins apart is by their haircuts.'", () => {
    const disguised = vm.concealWords("The only way one can tell the twins apart is by their haircuts.", [ "tell", "apart", "distinguish" ])
    expect(disguised).toBe("The only way one can ~ the twins ~ is by their haircuts.")
  })

  it("handles 'I can't tell them apart. [Nie mogę ich odróżnić.]'", () => {
    const disguised = vm.concealWords("I can't tell them apart. [Nie mogę ich odróżnić.]", [ "tell", "apart", "distinguish" ])
    expect(disguised).toBe("I can't ~ them ~. [Nie mogę ich odróżnić.]")
  })

  it("handles 'They're marked, so you can tell them apart.'", () => {
    const disguised = vm.concealWords("They're marked, so you can tell them apart.", [ "tell", "apart", "distinguish" ])
    expect(disguised).toBe("They're marked, so you can ~ them ~.")
  })

  it("handles 'Could you tell apart an American accent from a British accent?'", () => {
    const disguised = vm.concealWords("Could you tell apart an American accent from a British accent?", [ "tell", "apart", "distinguish" ])
    expect(disguised).toBe("Could you ~ ~ an American accent from a British accent?")
  })

  it("handles 'Ann was told off by her father for coming late home.'", () => {
    const disguised = vm.concealWords("Ann was told off by her father for coming late home.", [ "tell", "off", "scold", "reprimand" ])
    expect(disguised).toBe("Ann was ~ ~ by her father for coming late home.")
  })

  it("handles 'I told the boys off for making so much noise.'", () => {
    const disguised = vm.concealWords("I told the boys off for making so much noise.", [ "tell", "off", "scold", "reprimand" ])
    expect(disguised).toBe("I ~ the boys ~ for making so much noise.")
  })

  it("handles 'Did you get told off?'", () => {
    const disguised = vm.concealWords("Did you get told off?", [ "tell", "off", "scold", "reprimand" ])
    expect(disguised).toBe("Did you get ~ ~?")
  })

  it("handles 'I couldn't think of a good example then. [Wtedy nie przychodził mi do głowy żaden dobry przykład]'", () => {
    const disguised = vm.concealWords("I couldn't think of a good example then. [Wtedy nie przychodził mi do głowy żaden dobry przykład]", [ "think", "of" ])
    expect(disguised).toBe("I couldn't ~ ~ a good example then. [Wtedy nie przychodził mi do głowy żaden dobry przykład]")
  })

  it("handles 'Racing drivers rarely think of the dangers involved in their profession.'", () => {
    const disguised = vm.concealWords("Racing drivers rarely think of the dangers involved in their profession.", [ "think", "of" ])
    expect(disguised).toBe("Racing drivers rarely ~ ~ the dangers involved in their profession.")
  })

  it("handles 'Don't you ever think about other people?'", () => {
    const disguised = vm.concealWords("Don't you ever think about other people?", [ "think", "about" ])
    expect(disguised).toBe("Don't you ever ~ ~ other people?")
  })

  it("handles 'It's a very well thought out plan.'", () => {
    const disguised = vm.concealWords("It's a very well thought out plan.", [ "think", "out" ])
    expect(disguised).toBe("It's a very well ~ ~ plan.")
  })

  it("handles 'If you can't talk out your differences with your fiance, you'd better break up.'", () => {
    const disguised = vm.concealWords("If you can't talk out your differences with your fiance, you'd better break up.", [ "think", "out" ])
    expect(disguised).toBe("If you can't talk ~ your differences with your fiance, you'd better break up.")
  })

  it("handles 'My parents advised me to think things over before accepting the job.'", () => {
    const disguised = vm.concealWords("My parents advised me to think things over before accepting the job.", [ "think", "over" ])
    expect(disguised).toBe("My parents advised me to ~ things ~ before accepting the job.")
  })

  it("handles 'He'd like more time to think things over.'", () => {
    const disguised = vm.concealWords("He'd like more time to think things over.", [ "think", "over" ])
    expect(disguised).toBe("He'd like more time to ~ things ~.")
  })

  it("handles 'I've been thinking over what you said.'", () => {
    const disguised = vm.concealWords("I've been thinking over what you said.", [ "think", "over" ])
    expect(disguised).toBe("I've been ~ing ~ what you said.")
  })

  it("handles 'We need to think up an exciting advertising campaign for our new product.'", () => {
    const disguised = vm.concealWords("We need to think up an exciting advertising campaign for our new product.", [ "think", "up" ])
    expect(disguised).toBe("We need to ~ ~ an exciting advertising campaign for our new product.")
  })

  it("handles 'Can't you think up a better excuse than that?'", () => {
    const disguised = vm.concealWords("Can't you think up a better excuse than that?", [ "think", "up" ])
    expect(disguised).toBe("Can't you ~ ~ a better excuse than that?")
  })

  it("handles 'the opinion of the public at large'", () => {
    const disguised = vm.concealWords("the opinion of the public at large", [ "at", "large" ])
    expect(disguised).toBe("the opinion of the public ~ ~")
  })

  it("handles 'There are a number of possible remedies to this problem.'", () => {
    const disguised = vm.concealWords("There are a number of possible remedies to this problem.", [ "remedy", "solution", "to" ])
    expect(disguised).toBe("There are a number of possible ~s ~ this problem.")
  })

  it("handles 'A staging area for training exercises'", () => {
    const disguised = vm.concealWords("A staging area for training exercises", [ "staging", "area" ])
    expect(disguised).toBe("A ~ ~ for training exercises")
  })

  it("handles 'The church was used as a staging area for the flood relief effort'", () => {
    const disguised = vm.concealWords("The church was used as a staging area for the flood relief effort", [ "staging", "area" ])
    expect(disguised).toBe("The church was used as a ~ ~ for the flood relief effort")
  })
*/
})

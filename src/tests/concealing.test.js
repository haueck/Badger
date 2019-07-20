import concealing from "components/concealing"
import { mount } from "@vue/test-utils"

describe("Concealing", () => {

  let vm = mount(concealing).vm

  it("correctly preprocesses [ 'one', 'two', 'three' ]", () => {
    expect(vm.prepareWords([ 'one', 'two', 'three' ])).toStrictEqual([ 'one', 'two', 'three' ])
  })

  it("correctly preprocesses [ 'one', 'two', 'two' ]", () => {
    expect(vm.prepareWords([ 'one', 'two', 'two' ])).toStrictEqual([ 'one', 'two' ])
  })

  it("correctly preprocesses [ 'one two two' ]", () => {
    expect(vm.prepareWords([ 'one two two' ])).toStrictEqual([ 'one', 'two' ])
  })

  it("correctly preprocesses [ 'cast one's mind back' ]", () => {
    expect(vm.prepareWords([ 'cast one\'s mind back' ])).toStrictEqual([ 'cast', 'one\'s', 'mind', 'back' ])
  })

  it("correctly preprocesses [ 'cast (an eye)/(one's eye/eyes) over sb/sth' ]", () => {
    expect(vm.prepareWords([ 'cast (an eye)/(one\'s eye/eyes) over sb/sth' ])).toStrictEqual([ 'cast', 'an', 'eye', 'over', 'sb', 'sth', 'one\'s', 'eyes' ])
  })

  it("correctly preprocesses [ 'rear-view mirror' ]", () => {
    expect(vm.prepareWords([ 'rear-view mirror' ])).toStrictEqual([ 'rear-view', 'mirror' ])
  })

  it("correctly preprocesses [ 'stick'em (up!)/up' ]", () => {
    expect(vm.prepareWords([ 'stick\'em (up!)/up' ])).toStrictEqual([ 'stick\'em', 'up' ])
  })

  it("correctly preprocesses [ 'nothing venture, nothing gain/win' ]", () => {
    expect(vm.prepareWords([ 'nothing venture, nothing gain/win' ])).toStrictEqual([ 'nothing', 'venture', "gain", 'win' ])
  })

  it("correctly preprocesses [ 'Holy cow!' ]", () => {
    expect(vm.prepareWords([ 'Holy cow!' ])).toStrictEqual([ 'holy', 'cow' ])
  })

  it("handles 'I would be wiser to wait few days'", () => {
    const disguised = vm.concealWords("I would be wiser to wait few days", [ "wise" ])
    expect(disguised).toBe("I would be ~er to wait few days")
  })

  it("handles 'The changes made the company leaner and more competitive'", () => {
    const disguised = vm.concealWords("The changes made the company leaner and more competitive", [ "lean" ])
    expect(disguised).toBe("The changes made the company ~er and more competitive")
  })

  it("handles 'He called her the foulest names imaginable'", () => {
    const disguised = vm.concealWords("He called her the foulest names imaginable", [ "foul", "offensive" ])
    expect(disguised).toBe("He called her the ~est names imaginable")
  })

  it("handles 'To recover from the divorce, I threw myself into a whirlwind of activities'", () => {
    const disguised = vm.concealWords("To recover from the divorce, I threw myself into a whirlwind of activities", [ "whirlwind" ])
    expect(disguised).toBe("To recover from the divorce, I threw myself into a ~ of activities")
  })

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

  it("handles 'Angola, a country ravaged by a 27-year civil war which left millions homeless, is now moving out of the dark ages into a post-war rejuvenation period.'", () => {
    const disguised = vm.concealWords("Angola, a country ravaged by a 27-year civil war which left millions homeless, is now moving out of the dark ages into a post-war rejuvenation period.", [ "ravage", "devastate" ])
    expect(disguised).toBe("Angola, a country ~ed by a 27-year civil war which left millions homeless, is now moving out of the dark ages into a post-war rejuvenation period.")
  })

  it("handles 'The thieves soon blended in with the crowd and got away'", () => {
    const disguised = vm.concealWords("The thieves soon blended in with the crowd and got away", [ "blend", "in", "with", "sth", "sb" ])
    expect(disguised).toBe("The thieves soon ~ed ~ ~ the crowd and got away")
  })

  it("handles 'A debilitating disease'", () => {
    const disguised = vm.concealWords("A debilitating disease", [ "debilitate" ])
    expect(disguised).toBe("A ~ing disease")
  })

  it("handles 'I'll have to make a few enquiries and get back to you'", () => {
    const disguised = vm.concealWords("I'll have to make a few enquiries and get back to you", [ "enquiry" ])
    expect(disguised).toBe("I'll have to make a few ~s and get back to you")
  })

  it("handles 'A couple of teenagers were kissing and cuddling on the doorstep'", () => {
    const disguised = vm.concealWords("A couple of teenagers were kissing and cuddling on the doorstep", [ "cuddle", "hug", "cuddly" ])
    expect(disguised).toBe("A couple of teenagers were kissing and ~ing on the doorstep")
  })

  it("handles 'She hated her parents' endless interrogations about where she'd been'", () => {
    const disguised = vm.concealWords("She hated her parents' endless interrogations about where she'd been", [ "interrogation", "interrogate" ])
    expect(disguised).toBe("She hated her parents' endless ~s about where she'd been")
  })

  it("handles 'His parents agreed to pay the rent for his apartment but otherwise left him to fend for himself'", () => {
    const disguised = vm.concealWords("His parents agreed to pay the rent for his apartment but otherwise left him to fend for himself", [ "fend", "for", "yourself" ])
    expect(disguised).toBe("His parents agreed to pay the rent ~ his apartment but otherwise left him to ~ ~ ~")
  })

  it("handles 'The fox was released into the wild when it was old enough to fend for itself'", () => {
    const disguised = vm.concealWords("The fox was released into the wild when it was old enough to fend for itself", [ "fend", "for", "yourself" ])
    expect(disguised).toBe("The fox was released into the wild when it was old enough to ~ ~ ~")
  })

  it("handles 'Temperature will be kept constant to stop the seeds germinating or rotting, the wheat seeds will remain viable for an estimated 1700 years'", () => {
    const disguised = vm.concealWords("Temperature will be kept constant to stop the seeds germinating or rotting, the wheat seeds will remain viable for an estimated 1700 years", [ "germinate" ])
    expect(disguised).toBe("Temperature will be kept constant to stop the seeds ~ing or rotting, the wheat seeds will remain viable for an estimated 1700 years")
  })

  it("handles 'This is just one of several planned refurbishments'", () => {
    const disguised = vm.concealWords("This is just one of several planned refurbishments", [ "refurbishment" ])
    expect(disguised).toBe("This is just one of several planned ~s")
  })

  it("handles 'The company quickly ramped up production to meet the demand'", () => {
    const disguised = vm.concealWords("The company quickly ramped up production to meet the demand", [ "ramp", "sth", "up" ])
    expect(disguised).toBe("The company quickly ~ed ~ production to meet the demand")
  })

  it("handles 'The road followed the undulations of the landscape'", () => {
    const disguised = vm.concealWords("The road followed the undulations of the landscape", [ "undulate", "undulation" ])
    expect(disguised).toBe("The road followed the ~s of the landscape")
  })

  it("handles 'Camouflage and conspicuousness are in the eye of the beholder'", () => {
    const disguised = vm.concealWords("Camouflage and conspicuousness are in the eye of the beholder", [ "beauty", "is", "in", "the", "eye", "of", "beholder" ])
    expect(disguised).toBe("Camouflage and conspicuousness are ~ ~ ~ ~ ~ ~")
  })

  it("handles 'The chamber must withstand the full brunt of deep-see pressure'", () => {
    const disguised = vm.concealWords("The chamber must withstand the full brunt of deep-see pressure", [ "bear", "take", "withstand", "the", "brunt", "of", "sth" ])
    expect(disguised).toBe("~ chamber must ~ ~ full ~ ~ deep-see pressure")
  })

  it("handles 'The car was souped up with shiny rims and loud stereo.'", () => {
    const disguised = vm.concealWords("The car was souped up with shiny rims and loud stereo.", [ "soup", "up" ])
    expect(disguised).toBe("The car was ~ed ~ with shiny rims and loud stereo.")
  })

  it("handles 'James is a chip off the old block - he reacts exactly the same way as his father.'", () => {
    const disguised = vm.concealWords("James is a chip off the old block - he reacts exactly the same way as his father.", [ "A", "chip", "off", "the", "old", "block" ])
    expect(disguised).toBe("James is ~ ~ ~ ~ ~ ~ - he reacts exactly ~ same way as his father.")
  })

  it("handles 'He looked tired and had a five o'clock shadow.'", () => {
    const disguised = vm.concealWords("He looked tired and had a five o'clock shadow.", [ "five", "o'clock", "shadow" ])
    expect(disguised).toBe("He looked tired and had a ~ ~ ~.")
  })

  it("handles 'He thinks his refusal to join the team will cause problem, but there are alternatives... he's not the only pebble on the beach.'", () => {
    const disguised = vm.concealWords("He thinks his refusal to join the team will cause problem, but there are alternatives... he's not the only pebble on the beach.", [ "not", "only", "pebble", "on", "the", "beach" ])
    expect(disguised).toBe("He thinks his refusal to join ~ team will cause problem, but there are alternatives... he's ~ ~ ~ ~ ~ ~ ~.")
  })

  it("handles 'I was going to take a ride on Geoff's motorcycle, but I chickened out when he gave me a helmet to wear.'", () => {
    const disguised = vm.concealWords("I was going to take a ride on Geoff's motorcycle, but I chickened out when he gave me a helmet to wear.", [ "chicken", "out" ])
    expect(disguised).toBe("I was going to take a ride on Geoff's motorcycle, but I ~ed ~ when he gave me a helmet to wear.")
  })

  it("handles 'Arthur clammed up when I asked him about his family.'", () => {
    const disguised = vm.concealWords("Arthur clammed up when I asked him about his family.", [ "clam", "up" ])
    expect(disguised).toBe("Arthur ~ed ~ when I asked him about his family.")
  })

  it("handles 'Holy cow! I can't believe you ate everything on your plate.'", () => {
    const disguised = vm.concealWords("Holy cow! I can't believe you ate everything on your plate.", [ "Holy", "cow" ])
    expect(disguised).toBe("~ ~! I can't believe you ate everything on your plate.")
  })

  it("handles 'Our one-year-old is saying bad words now. I told my husband, monkey see, monkey do'", () => {
    const disguised = vm.concealWords("Our one-year-old is saying bad words now. I told my husband, monkey see, monkey do", [ "monkey", "see", "do" ])
    expect(disguised).toBe("Our one-year-old is saying bad words now. I told my husband, ~ ~, ~ ~")
  })

  it("handles 'I pigged out on pancakes so I don't have room for lunch'", () => {
    const disguised = vm.concealWords("I pigged out on pancakes so I don't have room for lunch", [ "pig", "out" ])
    expect(disguised).toBe("I ~ed ~ on pancakes so I don't have room for lunch")
  })

  it("handles 'He just rehashes songs from the 60s'", () => {
    const disguised = vm.concealWords("He just rehashes songs from the 60s", [ "rehash" ])
    expect(disguised).toBe("He just ~s songs from the 60s")
  })

  it("handles 'I wish my mother would stop interfering and let me make my own decisions.'", () => {
    const disguised = vm.concealWords("I wish my mother would stop interfering and let me make my own decisions.", [ "interfere" ])
    expect(disguised).toBe("I wish my mother would stop ~ing and let me make my own decisions.")
  })

  it("handles 'The job involves gathering and analysing data.'", () => {
    const disguised = vm.concealWords("The job involves gathering and analysing data.", [ "analyse" ])
    expect(disguised).toBe("The job involves gathering and ~ing data.")
  })

  it("handles 'Where can I go to hear Sean do things like relentlessly flogging his new book'", () => {
    const disguised = vm.concealWords("Where can I go to hear Sean do things like relentlessly flogging his new book", [ "flog" ])
    expect(disguised).toBe("Where can I go to hear Sean do things like relentlessly ~ing his new book")
  })

  it("handles 'This evidence meshes with earlier reports of an organized riot'", () => {
    const disguised = vm.concealWords("This evidence meshes with earlier reports of an organized riot", [ "mesh" ])
    expect(disguised).toBe("This evidence ~s with earlier reports of an organized riot")
  })

  it("handles 'She insists on vetting questions prior to an interview'", () => {
    const disguised = vm.concealWords("She insists on vetting questions prior to an interview", [ "vet", "screen" ])
    expect(disguised).toBe("She insists on ~ing questions prior to an interview")
  })

  it("handles 'Fat chance you have of being able to afford a bike'", () => {
    const disguised = vm.concealWords("Fat chance you have of being able to afford a bike", [ "a", "fat", "chance", "of", "sth", "doing" ])
    expect(disguised).toBe("~ ~ you have ~ being able to afford ~ bike")
  })

  it("handles 'She was mortified to realize he had heard every word she said.'", () => {
    const disguised = vm.concealWords("She was mortified to realize he had heard every word she said.", [ "mortify", "mortification", "mortifying" ])
    expect(disguised).toBe("She was ~ed to realize he had heard every word she said.")
  })

  it("handles 'He told a traffic police officer something along the lines of 'move over' and began manning the traffic himself in order to speed it up.'", () => {
    const disguised = vm.concealWords("He told a traffic police officer something along the lines of 'move over' and began manning the traffic himself in order to speed it up.", [ "move", "over" ])
    expect(disguised).toBe("He told a traffic police officer something along the lines of '~ ~' and began manning the traffic himself in order to speed it up.")
  })

  it("handles 'A good way to discover the reality of retirement is to find out how retired relatives have coped with their finances.'", () => {
    const disguised = vm.concealWords("A good way to discover the reality of retirement is to find out how retired relatives have coped with their finances.", [ "cope", "with", "manage" ])
    expect(disguised).toBe("A good way to discover the reality of retirement is to find out how retired relatives have ~ed ~ their finances.")
  })

  it("handles 'A fried egg and two rashers of bacon'", () => {
    const disguised = vm.concealWords("A fried egg and two rashers of bacon", [ "a", "rasher", "of", "sth", "slice" ])
    expect(disguised).toBe("~ fried egg and two ~s ~ bacon")
  })

  it("handles 'jobs on the side could be a good way to making ends meet...'", () => {
    const disguised = vm.concealWords("jobs on the side could be a good way to making ends meet...", [ "make", "ends", "meet" ])
    expect(disguised).toBe("jobs on the side could be a good way to ~ing ~ ~...")
  })

})

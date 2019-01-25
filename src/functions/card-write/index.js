/*global process exports*/
const Firestore = require("@google-cloud/firestore")
const firestore = new Firestore({ projectId: process.env.GCP_PROJECT })

exports.processCard = (event, context) => {
  const resource = context.resource
  console.log("Function triggered by change to: " +  resource)
  if (event.value && event.value.fields["Type"].stringValue === "English") {
    console.log("Processing English card")
    if ("CutExamples" in event.value.fields) {
      console.log("Updating...")
    } else {
      console.log("Inserting...")
      let cut = []
      const doc = firestore.doc(resource.split("/documents/")[1])
      for (let example of event.value.fields["Examples"].arrayValue.values) {
        cut.push(example.stringValue)
      }
      return doc.set({ "CutExamples": cut }, { merge: true })
    }
  }
}

/*
    cut() {
      let phrases = [ this.card['Word'], this.card['Related'].filter(x => x['Visibility'] == 'Hide').map(x => x['Word']) ]
      let remove = new Set()
      for (let phrase of phrases) {
        for (let alternative of this.alternatives(phrase)) {
          for (let word of alternative.split(" ")) {
            remove.add(word)
          }
        }
      }

         my @words = split /\/|\s+/, join ' ', map { s/<\/?\w+\/?>//g; toolsBrackets($_) } @params;
         my %uniq = ();
         my %replace = ();
         @uniq{@words} = ();
         foreach my $hide (keys %uniq) {
            $hide = lc $hide;
            $replace{$hide} = '~';
            # search, replace, show

            foreach my $i (0 .. $#suffixes / 3) {
               my $var = $hide;
               $replace{$var} = $suffixes[3*$i+2] if $var =~ s/$suffixes[3*$i]$/$suffixes[3*$i+1]/;
            }
            foreach my $i (0 .. $#irregular / 2) {
               $replace{$irregular[2*$i+1]} = '~' if $hide eq $irregular[2*$i];
            }
         }
         return %replace;
      }

sub stem
{
   my ($self, $phrase) = @_;
   foreach my $p ('doing', @prepositions, @pronouns, @adverbs)
   {
      $phrase =~ s/\b$p\b//g;
   }
   $phrase =~ s/\||\(|\)|\/|!//g;
   $phrase =~ s/^\s+|\s+$//g;
   return $phrase;
}

sub update {
   my ($self, $cgi, @remove) = @_;
   $self->SUPER::update($cgi);
   my $boldh = $self->boldh;
   my $example = $boldh->attr('EnglishExample');
   my $cut = $boldh->attr('EnglishCutExample');
   my $related = $boldh->attr('RelatedWord');
   my $relation = $boldh->attr('RelationType');
   my $rdesc = $boldh->attr('RelatedDescription');
   my $wordgroup = $boldh->attr('WordGroup');
   my $group;
   foreach my $param ($cgi->param) {
      if ($param =~ /^Word-(\d*)$/) {
         $group = lc $cgi->param($param);
         push @remove, $cgi->param($param);
         last;
      }
   }

   foreach my $param ($cgi->param)
   {
      if ($param =~ /^PhrasalVerb-(\d*)$/ and $cgi->param($param))
      {
         $group = $self->stem($group);
         last;
      }
   }

   my $groupid = $boldh->dbh->select_value('
      SELECT WordGroupID
      FROM WordGroups
      WHERE WordGroup = ? AND WordGroupOwner = ?',
      undef, $group, $self->user
   );

   unless ($groupid)
   {
      $groupid = $wordgroup->addEnumValue(Value => $group);
      $boldh->attr('WordGroupOwner')->updateAttribute(Row => $groupid, Value => $self->user);
   }
   $wordgroup->updateAttribute(Row => $self->id, Value => $groupid);

   $boldh->dbh->do('
      DELETE g
      FROM WordGroups g
      LEFT JOIN English e ON g.WordGroupID = e.WordGroupID
      WHERE g.WordGroupOwner = ? AND isnull(e.WordGroupID)',
      undef, $self->user
   );

   foreach my $param ($cgi->param) {
      if ($param =~ /^RelatedWord-(\d*)$/) {
         if (my $row = $1) {
            if (my $value = $cgi->param($param)) {
               push @remove, $cgi->param($param);
               $related->updateAttribute(Value => $value, Row => $row);
               $relation->updateAttribute(Value => $cgi->param("RelationType-$row"), Row => $row);
               $rdesc->updateAttribute(Value => $cgi->param("RelatedDescription-$row"), Row => $row);
            }
            else {
               $related->removeAttribute(Row => $row);
            }
         }
         else {
            my @rw = $cgi->param($param);
            my @rt = $cgi->param('RelationType-');
            my @rd = $cgi->param('RelatedDescription-');
            foreach my $i (0 .. $#rw) {
               push @remove, $rw[$i] || next;
               my $row = $related->addAttribute(Value => $rw[$i], Reference => $self->id);
               $relation->addAttribute(Value => $rt[$i], Reference => $row);
               $rdesc->addAttribute(Value => $rd[$i], Row => $row);
            }
         }
      }
   }
   my %replace = $self->inflection(@remove);
   my $search = join '|', keys %replace;
   foreach my $param ($cgi->param) {
      if ($param =~ /^EnglishExample-(\d*)$/) {
         if (my $row = $1) {
            if (my $value = $cgi->param($param)) {
               $example->updateAttribute(Value => $value, Row => $row);
               $value =~ s/(?<!\w)($search)(?!\w)/$replace{lc($1)}/ig;
               $cut->updateAttribute(Value => $value, Row => $row);
            }
            else {
               $example->removeAttribute(Row => $row);
            }
         }
         else {
            foreach my $value ($cgi->param($param)) {
               next unless $value;
               my $row = $example->addAttribute(Value => $value, Reference => $self->{'RiddleID'});
               $value =~ s/(?<!\w)($search)(?!\w)/$replace{lc($1)}/ig;
               $cut->addAttribute(Value => $value, Reference => $row);
            }
         }
      }
   }
}

sub stem
{
   my ($self, $phrase) = @_;
   foreach my $p ('doing', @prepositions, @pronouns, @adverbs)
   {
      $phrase =~ s/\b$p\b//g;
   }
   $phrase =~ s/\||\(|\)|\/|!//g;
   $phrase =~ s/^\s+|\s+$//g;
   return $phrase;
}

sub inflection {
   my $self = shift;
   my @params = @_;
   my @words = split /\/|\s+/, join ' ', map { s/<\/?\w+\/?>//g; toolsBrackets($_) } @params;
   my %uniq = ();
   my %replace = ();
   @uniq{@words} = ();
   foreach my $hide (keys %uniq) {
      $hide = lc $hide;
      $replace{$hide} = '~';
      # search, replace, show
      my @suffixes = (
      );
      foreach my $i (0 .. $#suffixes / 3) {
         my $var = $hide;
         $replace{$var} = $suffixes[3*$i+2] if $var =~ s/$suffixes[3*$i]$/$suffixes[3*$i+1]/;
      }
      foreach my $i (0 .. $#irregular / 2) {
         $replace{$irregular[2*$i+1]} = '~' if $hide eq $irregular[2*$i];
      }
   }
   return %replace;
}

export default {
  "suffixes": [
     // Plural and continuous form
     '', 's', '~s',
     's', 'ses', '~s',
     'x', 'xes', '~s',
     'ch', 'ches', '~s',
     'sh', 'shes', '~s',
     'o', 'oes', '~s',
     'f', 'ves', '~s',
     'fe', 'ves', '~s',
     'e?', 'ing', '~ing',
     'e?', 'ed', '~ed',
     'b', 'bbed', '~ed',
     'b', 'bbing', '~ing',
     'd', 'dded', '~ed',
     'd', 'dding', '~ing',
     'p', 'pped', '~ed',
     'p', 'pping', '~ing',
     't', 'tted', '~ed',
     't', 'tting', '~ing',
     'l', 'lled', '~ed',
     'l', 'lling', '~ing',
     'r', 'rred', '~ed',
     'r', 'rring', '~ing',
     'z', 'zzing', '~ing',
     's', 'ssed', '~ed',
     's', 'ssing', '~ing',
     'n', 'nned', '~ed',
     'n', 'nning', '~ing',
     'g', 'gged', '~ed',
     'g', 'gging', '~ing',
     'm', 'mmed', '~ed',
     'm', 'mming', '~ing',
     'y', 'ied', '~ed',
     'y', 'ies', '~s',
     'ic', 'icking', '~ing',
     // Comparative
     'e?', 'er', '~er',
     'e?', 'est', '~est',
     'y', 'ier', '~er',
     'y', 'iest', '~est',
     'd', 'dder', '~er',
     'p', 'pper', '~er',
     't', 'tter', '~er',
     'l', 'ller', '~er',
     's', 'sser', '~er',
     'n', 'nner', '~er',
     'g', 'gger', '~er',
     'm', 'mmer', '~er',
     'd', 'ddest', '~est',
     'p', 'ppest', '~est',
     't', 'ttest', '~est',
     'l', 'llest', '~est',
     's', 'ssest', '~est',
     'n', 'nnest', '~est',
     'g', 'ggest', '~est',
     'm', 'mmest', '~est',
     // Nouns and adjectives
     'e?', 'dom', '~',
     'e?', 'ial', '~',
     'e?', 'able', '~',
     'e?', 'ate', '~',
     'e?', 'ify', '~',
     'nt', 'ncy', '~',
     'ble', 'bility', '~',
     'y', 'ious', '~',
     'y', 'iful', '~',
     'd', 'sive', '~',
     'te', 'tion', '~',
     // Adverbs
     '' , 'ly', '~ly',
     'y' , 'ily', '~ly',
     'ic' , 'ally', '~ly',
     'le' , 'ly', '~ly',
     // Possessive nouns
     '', "'s", "~'s",
     '', "s'", "~s'",
     's', "ses'", "~s'"
  ],
  "prepositions": [
     'in front of',
     'aboard',
     'about',
     'above',
     'across',
     'after',
     'against',
     'along',
     'amid',
     'among',
     'anti',
     'around',
     'as',
     'at',
     'before',
     'behind',
     'below',
     'beneath',
     'beside',
     'besides',
     'between',
     'beyond',
     'but',
     'by',
     'concerning',
     'considering',
     'despite',
     'down',
     'during',
     'except',
     'excepting',
     'excluding',
     'following',
     'for',
     'from',
     'in',
     'inside',
     'into',
     'like',
     'minus',
     'near',
     'of',
     'off',
     'on',
     'onto',
     'opposite',
     'outside',
     'over',
     'past',
     'per',
     'plus',
     'regarding',
     'round',
     'save',
     'since',
     'than',
     'through',
     'to',
     'toward',
     'towards',
     'under',
     'underneath',
     'unlike',
     'until',
     'up',
     'upon',
     'versus',
     'via',
     'with',
     'within',
     'without'
  ],
  "irregular": [
     'had', 'have',
     'has', 'have',
     'awake', 'awoke',
     'awake', 'awoken',
     'bear', 'bore',
     'bear', 'born',
     'beat', 'beat',
     'become', 'became',
     'become', 'become',
     'begin', 'began',
     'begin', 'begun',
     'bend', 'bent',
     'beset', 'beset',
     'bet', 'bet',
     'be', 'been',
     'be', 'was,',
     'be', 'were',
     'bid', 'bade',
     'bid', 'bid',
     'bid', 'bidden',
     'bind', 'bound',
     'bite', 'bit',
     'bite', 'bitten',
     'bleed', 'bled',
     'blow', 'blew',
     'blow', 'blown',
     'break', 'broke',
     'break', 'broken',
     'breed', 'bred',
     'bring', 'brought',
     'broadcast', 'broadcast',
     'build', 'built',
     'burn', 'burned',
     'burn', 'burnt',
     'burst', 'burst',
     'buy', 'bought',
     'cast', 'cast',
     'catch', 'caught',
     'choose', 'chose',
     'choose', 'chosen',
     'cling', 'clung',
     'come', 'came',
     'come', 'come',
     'cost', 'cost',
     'creep', 'crept',
     'cut', 'cut',
     'deal', 'dealt',
     'dig', 'dug',
     'dive', 'dived',
     'dive', 'dove',
     'do', 'did',
     'do', 'done',
     'draw', 'drawn',
     'draw', 'drew',
     'dream', 'dreamed',
     'dream', 'dreamt',
     'drink', 'drank',
     'drink', 'drunk',
     'drive', 'driven',
     'drive', 'drove',
     'eat', 'ate',
     'eat', 'eaten',
     'fall', 'fallen',
     'fall', 'fell',
     'feed', 'fed',
     'feel', 'felt',
     'fight', 'fought',
     'find', 'found',
     'fit', 'fit',
     'flee', 'fled',
     'fling', 'flung',
     'fly', 'flew',
     'fly', 'flown',
     'forbid', 'forbade',
     'forbid', 'forbidden',
     'forego', 'foregone',
     'forego', 'forewent',
     'forego', '(forgo)',
     'forget', 'forgot',
     'forget', 'forgotten',
     'forgive', 'forgave',
     'forgive', 'forgiven',
     'forsake', 'forsaken',
     'forsake', 'forsook',
     'freeze', 'froze',
     'freeze', 'frozen',
     'get', 'got',
     'get', 'gotten',
     'give', 'gave',
     'give', 'given',
     'go', 'gone',
     'go', 'went',
     'grind', 'ground',
     'grow', 'grew',
     'grow', 'grown',
     'hang', 'hung',
     'hear', 'heard',
     'hide', 'hid',
     'hide', 'hidden',
     'hit', 'hit',
     'hold', 'held',
     'hurt', 'hurt',
     'keep', 'kept',
     'kneel', 'knelt',
     'knit', 'knit',
     'know', 'knew',
     'know', 'know',
     'lay', 'laid',
     'lead', 'led',
     'leap', 'leaped',
     'leap', 'leapt',
     'learn', 'learned',
     'learn', 'learnt',
     'leave', 'left',
     'lend', 'lent',
     'let', 'let',
     'lie', 'lain',
     'lie', 'lay',
     'light', 'lighted',
     'light', 'lit',
     'lose', 'lost',
     'make', 'made',
     'mean', 'meant',
     'meet', 'met',
     'misspell', 'misspelled',
     'misspell', 'misspelt',
     'mistake', 'mistaken',
     'mistake', 'mistook',
     'mow', 'mowed',
     'mow', 'mown',
     'overcome', 'overcame',
     'overcome', 'overcome',
     'overdo', 'overdid',
     'overdo', 'overdone',
     'overtake', 'overtaken',
     'overtake', 'overtook',
     'undertake', 'undertaken',
     'undertake', 'undertook',
     'overthrow', 'overthrew',
     'overthrow', 'overthrown',
     'pay', 'paid',
     'plead', 'pled',
     'prove', 'proved',
     'prove', 'proven',
     'put', 'put',
     'quit', 'quit',
     'read', 'read',
     'ride', 'ridden',
     'ride', 'rode',
     'rid', 'rid',
     'ring', 'rang',
     'ring', 'rung',
     'rise', 'risen',
     'rise', 'rose',
     'run', 'ran',
     'run', 'run',
     'saw', 'sawed',
     'saw', 'sawn',
     'say', 'said',
     'seek', 'sought',
     'see', 'saw',
     'see', 'seen',
     'foresee', 'foresaw',
     'foresee', 'foreseen',
     'sell', 'sold',
     'send', 'sent',
     'set', 'set',
     'sew', 'sewed',
     'sew', 'sewn',
     'shake', 'shaken',
     'shake', 'shook',
     'shave', 'shaved',
     'shave', 'shaven',
     'shear', 'shore',
     'shear', 'shorn',
     'shed', 'shed',
     'shine', 'shone',
     'shoe', 'shod',
     'shoe', 'shoed',
     'shoot', 'shot',
     'show', 'showed',
     'show', 'shown',
     'shrink', 'shrank',
     'shrink', 'shrunk',
     'shut', 'shut',
     'sing', 'sang',
     'sing', 'sung',
     'sink', 'sank',
     'sink', 'sunk',
     'sit', 'sat',
     'slay', 'slain',
     'slay', 'slew',
     'sleep', 'slept',
     'slide', 'slid',
     'sling', 'slung',
     'slit', 'slit',
     'smite', 'smitten',
     'smite', 'smote',
     'sow', 'sowed',
     'sow', 'sown',
     'speak', 'spoke',
     'speak', 'spoken',
     'speed', 'sped',
     'spend', 'spent',
     'spill', 'spilled',
     'spill', 'spilt',
     'spin', 'spun',
     'spit', 'spat',
     'spit', 'spit',
     'split', 'split',
     'spread', 'spread',
     'spring', 'sprang',
     'spring', 'sprung',
     'stand', 'stood',
     'steal', 'stole',
     'steal', 'stolen',
     'stick', 'stuck',
     'sting', 'stung',
     'stink', 'stank',
     'stink', 'stunk',
     'stride', 'stridden',
     'stride', 'strod',
     'strike', 'struck',
     'string', 'strung',
     'strive', 'striven',
     'strive', 'strove',
     'swear', 'swore',
     'swear', 'sworn',
     'sweep', 'swept',
     'swell', 'swelled',
     'swell', 'swollen',
     'swim', 'swam',
     'swim', 'swum',
     'swing', 'swung',
     'take', 'taken',
     'take', 'took',
     'teach', 'taught',
     'tear', 'tore',
     'tear', 'torn',
     'tell', 'told',
     'think', 'thought',
     'thrive', 'thrived',
     'thrive', 'throve',
     'throw', 'threw',
     'throw', 'thrown',
     'thrust', 'thrust',
     'tread', 'trod',
     'tread', 'trodden',
     'understand', 'understood',
     'uphold', 'upheld',
     'upset', 'upset',
     'wake', 'woke',
     'wake', 'woken',
     'wear', 'wore',
     'wear', 'worn',
     'weave', 'weaved',
     'weave', 'wove',
     'weave', 'woven',
     'wed', 'wed',
     'weep', 'wept',
     'wind', 'wound',
     'win', 'won',
     'withhold', 'withheld',
     'withstand', 'withstood',
     'wring', 'wrung',
     'write', 'written',
     'write', 'wrote',
     'lie', 'lying',
     'die', 'dying',
     'tie', 'tying',
     "one's", 'my',
     "one's", 'your',
     "one's", 'his',
     "one's", 'her',
     "one's", 'its',
     "one's", 'our',
     "one's", 'their',
     "sb's", 'my',
     "sb's", 'your',
     "sb's", 'his',
     "sb's", 'her',
     "sb's", 'its',
     "sb's", 'our',
     "sb's", 'their',
     "somebody's", 'my',
     "somebody's", 'your',
     "somebody's", 'his',
     "somebody's", 'her',
     "somebody's", 'its',
     "somebody's", 'our',
     "somebody's", 'their',
     "someone's", 'my',
     "someone's", 'your',
     "someone's", 'his',
     "someone's", 'her',
     "someone's", 'its',
     "someone's", 'our',
     "someone's", 'their',
     'oneself', 'myself',
     'oneself', 'yourself',
     'oneself', 'himself',
     'oneself', 'herself',
     'oneself', 'itself',
     'oneself', 'ourselves',
     'oneself', 'yourselves',
     'oneself', 'themselves',
     'sth', 'something',
     'sb', 'somebody',
     'something', 'sth',
     'somebody', 'sb'
  ],
  "pronouns": [
     'all',
     'another',
     'any',
     'anybody',
     'anyone',
     'anything',
     'both',
     'each',
     'eachother',
     'either',
     'everybody',
     'everyone',
     'everything',
     'few',
     'he',
     'her',
     'hers',
     'herself',
     'him',
     'himself',
     'his',
     'it',
     'its',
     'itself',
     'little',
     'many',
     'me',
     'mine',
     'more',
     'most',
     'much',
     'my',
     'myself',
     'neither',
     'noone',
     'nobody',
     'none',
     'nothing',
     'one',
     'oneanother',
     'oneself',
     'other',
     'others',
     'our',
     'ours',
     'ourselves',
     'through',
     'several',
     'she',
     'some',
     'somebody',
     'sb',
     'someone',
     'something',
     'sth',
     'that',
     'their',
     'theirs',
     'them',
     'themselves',
     'these',
     'they',
     'this',
     'those',
     'us',
     'we',
     'what',
     'whatever',
     'which',
     'whichever',
     'who',
     'whoever',
     'whom',
     'whomever',
     'whose',
     'you',
     'your',
     'yours',
     'yourself',
     'yourselves'
  ],
  "adverbs": [
     'out',
     'apart',
     'away',
     'forth',
     'back',
     'together',
     'aside',
     'ahead',
     'alone',
     'forward',
     'backwards',
     'aback',
     'there'
  ]
}
*/

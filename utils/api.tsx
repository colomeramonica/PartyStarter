import { supabase } from '@/utils/supabase';

export async function saveUser(user: { [key: string]: any }) {
  const { data, error } = await supabase.from('users').insert([user]);
  if (error) {
    throw error;
  }
  return data;
}
export async function fetchCharacters() {
  let { data: characters, error } = await supabase
    .from('characters')
    .select('*')
    .range(0, 9);

  if (error) {
    throw error;
  }

  return characters;
}

export async function fetchClasses() {
  const { data, error } = await supabase.from('character_classes').select('name, description');
  if (error) {
    throw error;
  }
  return data;
}

export async function fetchRaces() {
  const { data, error } = await supabase.from('character_races').select('name, description, traits');
  if (error) {
    throw error;
  }
  return data;
}

export async function updateCharacter(id: string, data: { [key: string]: any }) {
  const { error } = await supabase.from('characters').upsert({ ...data, id });
  if (error) {
    throw error;
  }
}

export async function createCharacter(char: { [key: string]: any }) {
  const { data, error } = await supabase
    .from('characters')
    .insert([
      {
        name: char.name,
        description: char.description,
        user_id: char.user_id,
        race: char.race,
        class: char.class,
        strength: char.str,
        dexterity: char.dex,
        constitution: char.con,
        intelligence: char.int,
        wisdom: char.wis,
        charisma: char.char,
      },
    ])
    .select()

  if (error) {
    throw error;
  }

  return data;
}
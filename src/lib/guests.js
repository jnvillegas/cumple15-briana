import { supabase } from './supabase'

export async function getGuestByToken(token) {
  if (!token) return null
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('token', token)
    .maybeSingle()
  if (error || !data) return null
  return data
}

export async function listGuests() {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .order('token', { ascending: true })
  if (error) return []
  return data
}

export async function updateGuest(id, fields) {
  const { data, error } = await supabase
    .from('guests')
    .update(fields)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function createGuest({ name, count, phone = '', token, status = 'pendiente' }) {
  const { data, error } = await supabase
    .from('guests')
    .insert([{ name, count, phone, token, status }])
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteGuest(id) {
  const { error } = await supabase.from('guests').delete().eq('id', id)
  if (error) throw error
}

export function guestLink(token) {
  return `${window.location.origin}/?invitado=${token}`
}

export function normalizePhone(phone) {
  const digits = (phone || '').replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('54')) return digits
  return `549${digits}`
}

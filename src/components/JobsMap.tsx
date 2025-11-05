'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { getApproximateLocation, extractCountryFromLocation } from '@/utils/locationUtils'

interface Job {
  id: string
  title: string
  location_latitude: number
  location_longitude: number
  city: string
  category: string
  status: string
  budget_min?: number
  budget_max?: number
  source?: 'enterprise' | 'marketplace'
}

interface JobsMapProps {
  jobs: Job[]
  height?: string
  onJobClick?: (jobId: string, source: 'enterprise' | 'marketplace') => void
}

export default function JobsMap({ jobs, height = '500px', onJobClick }: JobsMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    // Hardcoded token for now - will work in production
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoibWV2YWkiLCJhIjoiY21ncjdlYTM5MDB6cjJsczdlNm51MnB5OCJ9.g8GDiDDWrl5K6tDHxvotpg'

    console.log('Mapbox token available:', !!token)

    if (!token) {
      console.error('Mapbox token is missing!')
      return
    }

    mapboxgl.accessToken = token

    // Initialize map with UK center if no jobs
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-2.0, 53.5], // UK center
      zoom: 5,
      pitch: 0,
      bearing: 0,
      antialias: true
    })

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // Add 3D buildings
    map.current.on('load', () => {
      setMapLoaded(true)

      const layers = map.current!.getStyle().layers
      const labelLayerId = layers?.find(
        (layer) => layer.type === 'symbol' && layer.layout && (layer.layout as any)['text-field']
      )?.id

      map.current!.addLayer(
        {
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#1a1f2e',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      )
    })

    return () => {
      markers.current.forEach(marker => marker.remove())
      markers.current = []
      map.current?.remove()
      map.current = null
    }
  }, [])

  useEffect(() => {
    if (!map.current || !mapLoaded || jobs.length === 0) return

    // Remove existing markers
    markers.current.forEach(marker => marker.remove())
    markers.current = []

    // Filter jobs with valid coordinates
    const validJobs = jobs.filter(
      job => job.location_latitude && job.location_longitude
    )

    if (validJobs.length === 0) return

    // Add markers for each job
    validJobs.forEach((job) => {
      const el = document.createElement('div')
      el.className = 'job-marker'

      // Different colors for enterprise vs marketplace
      const markerColor = job.source === 'marketplace'
        ? 'from-orange-500 to-orange-600'
        : 'from-blue-500 to-blue-600'

      const sourceLabel = job.source === 'marketplace' ? 'Marketplace' : 'My Job'
      const sourceColor = job.source === 'marketplace' ? 'text-orange-400' : 'text-blue-400'

      // For marketplace jobs, show approximate location only (privacy)
      // For enterprise jobs, show full location
      const displayLocation = job.source === 'marketplace'
        ? getApproximateLocation(job.city, extractCountryFromLocation(job.city))
        : job.city

      const privacyNotice = job.source === 'marketplace'
        ? '<div class="text-gray-500 text-xs mt-1">📍 Approximate area only</div>'
        : ''

      el.innerHTML = `
        <div class="relative group cursor-pointer">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br ${markerColor} border-4 border-white/20 shadow-lg flex items-center justify-center text-white font-bold text-sm animate-pulse hover:scale-125 transition-transform">
            ${job.status === 'open' ? '📍' : '🔧'}
          </div>
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
            <div class="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl border border-white/10 min-w-[200px]">
              <div class="font-bold mb-1">${job.title}</div>
              <div class="${sourceColor} text-xs font-semibold mb-1">${sourceLabel}</div>
              <div class="text-gray-400">${displayLocation}</div>
              ${privacyNotice}
              <div class="text-gray-400">${job.category}</div>
              ${job.budget_min && job.budget_max ? `<div class="text-green-400 font-semibold mt-1">£${job.budget_min} - £${job.budget_max}</div>` : ''}
              <div class="text-blue-400 text-xs mt-2">Click to view details →</div>
            </div>
          </div>
        </div>
      `

      // Add click handler
      el.addEventListener('click', () => {
        if (onJobClick) {
          onJobClick(job.id, job.source || 'enterprise')
        }
      })

      const marker = new mapboxgl.Marker(el)
        .setLngLat([job.location_longitude, job.location_latitude])
        .addTo(map.current!)

      markers.current.push(marker)
    })

    // Fit bounds to show all markers
    if (validJobs.length > 0) {
      const bounds = new mapboxgl.LngLatBounds()
      validJobs.forEach(job => {
        bounds.extend([job.location_longitude, job.location_latitude])
      })
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 13,
        duration: 1000
      })
    }
  }, [jobs, mapLoaded])

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ height }}>
      <div ref={mapContainer} className="w-full h-full" />

      {/* Map Legend */}
      <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-white">
        <div className="text-sm font-bold mb-3">Job Locations</div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600"></div>
            <span className="text-gray-400">My Jobs ({jobs.filter(j => j.source === 'enterprise').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-500 to-orange-600"></div>
            <span className="text-gray-400">Marketplace ({jobs.filter(j => j.source === 'marketplace').length})</span>
          </div>
          <div className="border-t border-white/10 my-2"></div>
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span className="text-gray-400">Open ({jobs.filter(j => j.status === 'open').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🔧</span>
            <span className="text-gray-400">In Progress ({jobs.filter(j => j.status === 'in_progress').length})</span>
          </div>
        </div>
      </div>

      {/* Job Count Badge */}
      <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm border border-primary/30 rounded-xl px-4 py-2 text-white font-bold text-sm shadow-lg">
        {jobs.length} Total Jobs
      </div>
    </div>
  )
}

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/api';
import DualRangeSlider from './DualRangeSlider';
import DiamondShapeIcon from './DiamondShapeIcons';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

const PRIMARY_SHAPES = ['Round', 'Princess', 'Cushion', 'Oval', 'Pear'];
const MORE_SHAPES = ['Emerald', 'Marquise', 'Heart', 'Asscher', 'Radiant'];

// Displayed worst → best, left to right, matching the reference site's slider layout
const COLOUR_LABELS = ['M', 'L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D'];
const CLARITY_LABELS = ['I1', 'SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF', 'FL'];
const CUT_LABELS = ['Fair', 'Good', 'Very Good', 'Excellent', 'Ideal'];
const GRADE_OPTIONS = ['Fair', 'Good', 'Very Good', 'Excellent'];
const FLUORESCENCE_OPTIONS = ['None', 'Faint', 'Medium', 'Strong'];
const LAB_OPTIONS = ['GIA', 'IGI', 'AGS'];

export default function DiamondBrowser() {
  const [diamonds, setDiamonds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid');
  const [showMoreShapes, setShowMoreShapes] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [selectedShapes, setSelectedShapes] = useState([]);
  const [colourMode, setColourMode] = useState('White'); // White | Fancy
  const [caratRange, setCaratRange] = useState([0, 30]);
  const [colourRange, setColourRange] = useState([0, COLOUR_LABELS.length - 1]);
  const [clarityRange, setClarityRange] = useState([0, CLARITY_LABELS.length - 1]);
  const [cutRange, setCutRange] = useState([0, CUT_LABELS.length - 1]);
  const [priceRange, setPriceRange] = useState([1, 7102142]);
  const [polish, setPolish] = useState([]);
  const [symmetry, setSymmetry] = useState([]);
  const [fluorescence, setFluorescence] = useState([]);
  const [certLab, setCertLab] = useState([]);
  const [sort, setSort] = useState('price-asc');

  const toggleShape = (s) => setSelectedShapes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleInArray = (arr, setArr, v) => setArr(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

  const fetchDiamonds = useCallback(async () => {
    setLoading(true);
    try {
      const params = { sort };
      if (selectedShapes.length) params.shape = selectedShapes.join(',');
      params.minCarat = caratRange[0];
      params.maxCarat = caratRange[1];
      if (colourMode === 'Fancy') {
        params.minColour = 'Fancy';
        params.maxColour = 'Fancy';
      } else {
        params.minColour = COLOUR_LABELS[colourRange[0]];
        params.maxColour = COLOUR_LABELS[colourRange[1]];
      }
      params.minClarity = CLARITY_LABELS[clarityRange[0]];
      params.maxClarity = CLARITY_LABELS[clarityRange[1]];
      params.minCut = CUT_LABELS[cutRange[0]];
      params.maxCut = CUT_LABELS[cutRange[1]];
      params.minPrice = priceRange[0];
      params.maxPrice = priceRange[1];
      if (polish.length) params.polish = polish.join(',');
      if (symmetry.length) params.symmetry = symmetry.join(',');
      if (fluorescence.length) params.fluorescence = fluorescence.join(',');
      if (certLab.length) params.certLab = certLab.join(',');

      const { data } = await api.get('/diamonds', { params });
      setDiamonds(data.diamonds || []);
    } catch { toast.error('Failed to load diamonds'); }
    finally { setLoading(false); }
  }, [selectedShapes, colourMode, caratRange, colourRange, clarityRange, cutRange, priceRange, polish, symmetry, fluorescence, certLab, sort]);

  useEffect(() => {
    // Sliders fire onChange continuously while dragging — debounce so we don't fire
    // a request per pixel of drag (that's what exhausted the API rate limit before).
    const timer = setTimeout(fetchDiamonds, 400);
    return () => clearTimeout(timer);
  }, [fetchDiamonds]);

  const chipStyle = (active) => ({
    padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer',
    border: active ? `2px solid ${C.coral}` : '1px solid #e5e7eb',
    background: active ? 'rgba(232,131,90,0.1)' : 'white',
    color: C.navy, fontWeight: active ? 700 : 400,
  });

  return (
    <section className="section" style={{ background: 'white' }}>
      <div className="container">

        {/* NATURAL tab */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '2px', color: C.navy, textTransform: 'uppercase', paddingBottom: '10px', borderBottom: `2px solid ${C.coral}` }}>Natural Diamonds</span>
        </div>

        {/* Filters */}
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', marginBottom: '28px' }}>

            {/* Shape */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', color: C.navy, marginBottom: '14px' }}>SHAPE</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', maxWidth: '420px' }}>
                {(showMoreShapes ? [...PRIMARY_SHAPES, ...MORE_SHAPES] : PRIMARY_SHAPES).map(s => (
                  <button key={s} onClick={() => toggleShape(s)} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '12px 6px',
                    borderRadius: '8px', cursor: 'pointer', background: selectedShapes.includes(s) ? 'rgba(232,131,90,0.1)' : '#fafafa',
                    border: selectedShapes.includes(s) ? `2px solid ${C.coral}` : '1px solid #e5e7eb',
                  }}>
                    <DiamondShapeIcon shape={s} size={26} color={C.navy} />
                    <span style={{ fontSize: '11px', color: C.navy }}>{s}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setShowMoreShapes(v => !v)} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '13px', cursor: 'pointer', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {showMoreShapes ? '▲ Fewer Shapes' : '▼ More Shapes'}
              </button>
            </div>

            {/* Carats */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', color: C.navy, marginBottom: '14px' }}>CARATS</div>
              <DualRangeSlider min={0} max={30} step={0.01} valueMin={caratRange[0]} valueMax={caratRange[1]} onChange={setCaratRange} />
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '8px', padding: '8px 12px' }}>
                  <input type="number" min="0" max="30" step="0.01" value={caratRange[0]} onChange={e => setCaratRange([Number(e.target.value), caratRange[1]])} style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px' }} /><span style={{ color: '#9ca3af', fontSize: '13px' }}>ct</span>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '8px', padding: '8px 12px' }}>
                  <input type="number" min="0" max="30" step="0.01" value={caratRange[1]} onChange={e => setCaratRange([caratRange[0], Number(e.target.value)])} style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px' }} /><span style={{ color: '#9ca3af', fontSize: '13px' }}>ct</span>
                </div>
              </div>
            </div>

            {/* Colour */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', color: C.navy }}>COLOUR</span>
                <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', border: '1px solid #d1d5db' }}>
                  <button onClick={() => setColourMode('White')} style={{ padding: '6px 16px', fontSize: '13px', border: 'none', cursor: 'pointer', background: colourMode === 'White' ? '#8a99ab' : 'white', color: colourMode === 'White' ? 'white' : C.navy }}>White</button>
                  <button onClick={() => setColourMode('Fancy')} style={{ padding: '6px 16px', fontSize: '13px', border: 'none', cursor: 'pointer', background: colourMode === 'Fancy' ? '#8a99ab' : 'white', color: colourMode === 'Fancy' ? 'white' : C.navy }}>Fancy</button>
                </div>
              </div>
              {colourMode === 'White' ? (
                <DualRangeSlider min={0} max={COLOUR_LABELS.length - 1} valueMin={colourRange[0]} valueMax={colourRange[1]} onChange={setColourRange} labels={COLOUR_LABELS} />
              ) : (
                <p style={{ color: '#9ca3af', fontSize: '13px' }}>Showing fancy colour diamonds.</p>
              )}
            </div>

            {/* Clarity */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', color: C.navy, marginBottom: '14px' }}>CLARITY</div>
              <DualRangeSlider min={0} max={CLARITY_LABELS.length - 1} valueMin={clarityRange[0]} valueMax={clarityRange[1]} onChange={setClarityRange} labels={CLARITY_LABELS} />
            </div>

            {/* Cut */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', color: C.navy, marginBottom: '14px' }}>CUT</div>
              <DualRangeSlider min={0} max={CUT_LABELS.length - 1} valueMin={cutRange[0]} valueMax={cutRange[1]} onChange={setCutRange} labels={CUT_LABELS} />
            </div>

            {/* Price */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', color: C.navy, marginBottom: '14px' }}>PRICE</div>
              <DualRangeSlider min={1} max={7102142} step={1} valueMin={priceRange[0]} valueMax={priceRange[1]} onChange={setPriceRange} />
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '8px', padding: '8px 12px' }}>
                  <span style={{ color: '#9ca3af', fontSize: '13px', marginRight: '4px' }}>CA$</span><input type="number" min="1" value={priceRange[0]} onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])} style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '8px', padding: '8px 12px' }}>
                  <span style={{ color: '#9ca3af', fontSize: '13px', marginRight: '4px' }}>CA$</span><input type="number" min="1" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])} style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', marginBottom: '16px' }}>
            <button onClick={() => setShowAdvanced(v => !v)} style={{ background: 'none', border: 'none', color: C.navy, fontWeight: 600, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Advanced Filters {showAdvanced ? '▲' : '▼'}
            </button>
            {showAdvanced && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginTop: '20px' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', color: C.navy, marginBottom: '10px' }}>POLISH</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{GRADE_OPTIONS.map(g => <button key={g} onClick={() => toggleInArray(polish, setPolish, g)} style={chipStyle(polish.includes(g))}>{g}</button>)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', color: C.navy, marginBottom: '10px' }}>SYMMETRY</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{GRADE_OPTIONS.map(g => <button key={g} onClick={() => toggleInArray(symmetry, setSymmetry, g)} style={chipStyle(symmetry.includes(g))}>{g}</button>)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', color: C.navy, marginBottom: '10px' }}>FLUORESCENCE</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{FLUORESCENCE_OPTIONS.map(f => <button key={f} onClick={() => toggleInArray(fluorescence, setFluorescence, f)} style={chipStyle(fluorescence.includes(f))}>{f}</button>)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', color: C.navy, marginBottom: '10px' }}>CERTIFYING LAB</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{LAB_OPTIONS.map(l => <button key={l} onClick={() => toggleInArray(certLab, setCertLab, l)} style={chipStyle(certLab.includes(l))}>{l}</button>)}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid #e5e7eb', paddingTop: '20px', marginBottom: '28px' }}>
          <span style={{ color: '#374151', fontSize: '14px' }}>{loading ? 'Loading…' : `Results - ${diamonds.length} Diamond${diamonds.length === 1 ? '' : 's'}`}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', border: '1px solid #d1d5db' }}>
              <button onClick={() => setView('list')} style={{ padding: '8px 16px', fontSize: '13px', border: 'none', cursor: 'pointer', background: view === 'list' ? '#8a99ab' : 'white', color: view === 'list' ? 'white' : C.navy }}>LIST</button>
              <button onClick={() => setView('grid')} style={{ padding: '8px 16px', fontSize: '13px', border: 'none', cursor: 'pointer', background: view === 'grid' ? '#8a99ab' : 'white', color: view === 'grid' ? 'white' : C.navy }}>GRID</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: '#374151', fontWeight: 600 }}>SORT:</span>
              <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px' }}>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="carat-asc">Carat: low to high</option>
                <option value="carat-desc">Carat: high to low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
        ) : diamonds.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', background: C.light, borderRadius: '12px' }}>
            <p style={{ color: '#9ca3af', fontSize: '18px' }}>No diamonds match these filters. Try widening your search.</p>
          </div>
        ) : view === 'grid' ? (
          <div className="grid-4">
            {diamonds.map(d => <DiamondCard key={d._id} d={d} />)}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {diamonds.map(d => <DiamondRow key={d._id} d={d} />)}
          </div>
        )}
      </div>
    </section>
  );
}

function DiamondCard({ d }) {
  const addToCart = (e) => { e.preventDefault(); toast.success('Added to inquiry cart — our team will confirm availability.'); };
  return (
    <Link to={`/diamonds/${d._id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ background: '#e9edf2', height: '220px', overflow: 'hidden' }}>
        <img src={d.image || '/course-fundamentals.png'} alt={`${d.shape} diamond`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: '16px 4px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1B2B4B', marginBottom: '6px', textTransform: 'uppercase', lineHeight: 1.4 }}>{d.caratWeight}ct {d.shape} Natural Diamond</h3>
        <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '10px' }}>Colour: <strong>{d.colour}</strong>,  Clarity: <strong>{d.clarity}</strong>,  Cut: <strong>{d.cut}</strong></p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontWeight: 700, color: '#1B2B4B', fontSize: '16px' }}>${d.price} {d.currency}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6b7280' }}>💎 {d.certLab} Certified</span>
        </div>
        <button onClick={addToCart} className="btn btn-outline btn-sm" style={{ width: '100%' }}>Add to Cart</button>
      </div>
    </Link>
  );
}

function DiamondRow({ d }) {
  const addToCart = (e) => { e.preventDefault(); toast.success('Added to inquiry cart — our team will confirm availability.'); };
  return (
    <Link to={`/diamonds/${d._id}`} style={{ textDecoration: 'none', display: 'flex', gap: '20px', alignItems: 'center', background: 'white', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '16px', flexWrap: 'wrap' }}>
      <div style={{ background: '#e9edf2', width: '120px', height: '90px', flexShrink: 0, borderRadius: '6px', overflow: 'hidden' }}>
        <img src={d.image || '/course-fundamentals.png'} alt={`${d.shape} diamond`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ flex: 1, minWidth: '200px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1B2B4B', textTransform: 'uppercase' }}>{d.caratWeight}ct {d.shape} Natural Diamond</h3>
        <p style={{ color: '#6b7280', fontSize: '13px' }}>Colour: <strong>{d.colour}</strong>,  Clarity: <strong>{d.clarity}</strong>,  Cut: <strong>{d.cut}</strong> · {d.certLab} Certified</p>
      </div>
      <span style={{ fontWeight: 700, color: '#1B2B4B', fontSize: '16px' }}>${d.price} {d.currency}</span>
      <button onClick={addToCart} className="btn btn-outline btn-sm">Add to Cart</button>
    </Link>
  );
}
